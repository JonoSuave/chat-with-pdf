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
	model: "gpt-4o",
});

export const indexName = "papafam";

async function namespaceExists(index: Index<RecordMetadata>, namespace: string) {
	if (!namespace) {
		throw new Error("Namespace is required");
	}
	const { namespaces } = await index.describeIndexStats();
	return namespaces?.[namespace] !== undefined;
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
        
    }
}
