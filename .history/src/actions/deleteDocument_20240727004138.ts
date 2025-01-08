"use server";

import { adminDb, adminStorage } from "../../firebaseAdmin";
import { indexName } from "@/lib/langchain";
import pineconeClient from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteDocument(docId: string) {
	auth().protect();

	const { userId } = await auth();

	// Delete the document from the Firebase database
	await adminDb.collection("users").doc(userId!).collection("files").doc(docId).delete();

	// Delete from firebase storage bucket
	await adminStorage
		.bucket(process.env.FIREBASE_STORAGE_BUCKET)
		.file(`users/${userId}/files/${docId}`)
		.delete();

// Delete all embeddings associated with the document in Pinecone
const index = pineconeClient.index(indexName);
await index.namespace(docId).

        // Revalidate the dashboard page to ensure the documents are up to date
        revalidatePath(`/dashboard`);
}
