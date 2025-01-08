'use server'

import { auth } from "@clerk/nextjs/server"

export async function generateEmbeddings(docId: string) {
    auth().protect(); // Protect this route with Clerk

    // turn a PDF into embeddings [0.0123]
    await generateEmbddingsInPineconeVectorStore(docId);
}