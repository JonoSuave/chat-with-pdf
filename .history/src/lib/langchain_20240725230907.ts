import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PineconeConflictError } from "@pinecone-database/pinecone/dist/errors";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { adminDb } from "../../firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

// Initialize the OpenAI model with API key and model name
const model = new ChatOpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	model: "gpt-4o-mini",
});

export const indexName = "papafam";

async function fetchMessagesFromDB(docId: string) {
	const { userId } = await auth();
	if (!userId) {
		throw new Error("User is not authenticated");
	}

	console.log("--- Fetching chat history from the firestore database ---");
	// Get the last 6 messages from the chat history
	const chats = await adminDb
		.collection("users")
		.doc(userId)
		.collection("files")
		.doc(docId)
		.collection("chat")
		.orderBy("createdAt", "desc")
		// .limit(6)
		.get();

	const chatHistory = chats.docs.map((doc) =>
		doc.data().role === "human"
			? new HumanMessage(doc.data().message)
			: new AIMessage(doc.data().message)
	);

	console.log(`--- Fetched ${chatHistory.length} messages from the chat history ---`);
	console.log(chatHistory.map((msg) => msg.content.toString()));

	return chatHistory;
}

async function namespaceExists(index: Index<RecordMetadata>, namespace: string) {
	if (!namespace) {
		throw new Error("Namespace is required");
	}
	const { namespaces } = await index.describeIndexStats();
	return namespaces?.[namespace] !== undefined;
}

export async function generateDocs(docId: string) {
	const { userId } = await auth();
	if (!userId) {
		throw new Error("User is not authenticated");
	}
	console.log(" --- Fetching the download URL from Firestore --- ");
	const firebaseRef = await adminDb
		.collection("users")
		.doc(userId)
		.collection("files")
		.doc(docId)
		.get();

	const downloadUrl = firebaseRef.data()?.downloadUrl;

	if (!downloadUrl) {
		throw new Error("Download URL not found");
	}

	console.log(`--- Download URL found: ${downloadUrl} ---`);

	// Fetch the PDF from the download URL
	const response = await fetch(downloadUrl);

	// Load the PDF into a PDFDocument object
	const data = await response.blob();

	// Load the PDF document from the specified path
	console.log("--- Loading the PDF document ---");
	const pdfLoader = new PDFLoader(data);
	const docs = await pdfLoader.load();

	// Split the loaded pdf document into smaller parts for easier processing. Note pdf docs are text only (not images)
	console.log("--- Splitting the document into smaller parts ---");
	const splitter = new RecursiveCharacterTextSplitter();

	const splitDocs = await splitter.splitDocuments(docs);
	console.log(`--- Split the document into ${splitDocs.length} parts ---`);

	return splitDocs;
}

export async function generateEmbddingsInPineconeVectorStore(docId: string) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User is not authenticated");
	}

	let pineconeVectorStore;

	console.log("--- Generating embeddings... ---");
	const embeddings = new OpenAIEmbeddings();

	const index = await pineconeClient.index(indexName);
	const namespaceAlreadyExists = await namespaceExists(index, docId);

	if (namespaceAlreadyExists) {
		console.log(`--- Namespace ${docId} already exists, resusing existing embeddings... ---`);

		pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
			pineconeIndex: index,
			namespace: docId,
		});

		return pineconeVectorStore;
	} else {
		// If the namespace does not exist, download the PDF from the firestore via the stored Download URL & generate embeddings and store them in the Pinecone vector store
		const splitDocs = await generateDocs(docId);

		console.log(
			`--- Storing the embeddings in namespace ${docId} in the ${indexName} Pinecone vector store... ---`
		);

		pineconeVectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
			pineconeIndex: index,
			namespace: docId,
		});

		return pineconeVectorStore;
	}

	const generateLangchainCompletion = async (docId: string, question: string) => {
		let pineconeVectorStore;

		pineconeVectorStore = await generateEmbddingsInPineconeVectorStore(docId);
		if (!pineconeVectorStore) {
			throw new Error("Pinecone vector store was not found");
		}

		// Create a retriever to search through the vector store
		console.log("--- Creating a retriever to search through the vector store ---");
		const retriever = pineconeVectorStore.asRetriever();

		// Fetch the chat history from the database
		const chatHistory = await fetchMessagesFromDB(docId);

		// Define a prompt template for generating search queries based on the chat history
		const historyAwarePropt = ChatPromptTemplate.fromMessages([
			...chatHistory, // Insert the actial chat history here
			["user", "{input}"],
			[
				"user",
				"Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
			],
		]);

		// Create a history-aware retriever chain that uses the model, retriever, and prompt
		console.log("--- Creating a history-aware retriever chain ---");
		const historyAwareRetrieverChain = await createHistoryAwareRetriever({
			llm: model,
			retriever,
			rephrasePrompt: historyAwarePropt,
		});

		// Define a propmpt template for answering questions based on retrieved context
		console.log(
			"--- Defining a prompt template for answering questions based on retrieved context ---"
		);
		const historyAwareRetrieverPrompt = ChatPromptTemplate.fromMessages([
			["system", "Answer the user's questions based on the below context: \n\n{context}"],
			...chatHistory, // Insert the actual chat history here
			["user", "{input}"],
		]);

		// Create a chain to combine the retrieved documents into a coherent response
		console.log("--- Creating a chain to combine the retrieved documents into a coherent response ---");
		const historyAwareCombineDocsChain = await createStuffDocumentsChain({
			llm: model,
			prompt: historyAwareRetrieverPrompt
		});

		// Create the main retrieval chain that combines the history-aware retriever and document com
	};
}
