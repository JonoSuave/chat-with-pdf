'use server'

import { auth } from "@clerk/nextjs/server"

export async function generateEmbeddings(docId: string) {
    auth().protect(); // Protect this route with Clerk

    // turn a PDF into embeddings [0.01234,]
    await generateEmbddingsInPineconeVectorStore(docId);
}