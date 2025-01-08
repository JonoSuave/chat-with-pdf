'use server'

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId: string) {
    auth().protect(); // Protect this route with Clerk

    // turn a PDF into embeddings [0.01234, 0.56789, ...]
    await generateEmbddingsInPineconeVectorStore(docId);

    revalidatePath('/dashboard'); // Revalidate the dashboard page

    return { completed: true };
}