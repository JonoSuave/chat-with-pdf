import { Pinecone } from '@pinecone-database/pinecone';


if (!process.env.PINECONE_API_KEY) {
    throw new Error("Pinecone API Key is required");
}

const pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

export default pineconeClient;