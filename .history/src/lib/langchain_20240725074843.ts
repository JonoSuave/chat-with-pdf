import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


// Initialize the OpenAI model with API key and model name
const model = new ChatOpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	model: "gpt-4o",
});
