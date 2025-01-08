"use server";

import { adminDb, adminStorage } from "../../firebaseAdmin";
import { indexName } from "@/lib/langchain";
import pineconeClient from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteDocument(docId: string) {
    auth().protect();

    const { userId } = await auth();

    const docRef = adminDb.collection("users").doc(userId).collection("files").doc(docId);

    const doc = await docRef.get();

    if (!doc.exists) {
        throw new Error("Document not found");
    }

    const docData = doc.data();

    if (!docData) {
        throw new Error("Document data not found");
    }

    const { langchainId } = docData;

    // delete the document from firebase
    await docRef.delete();

    // delete the document from storage
    await adminStorage.bucket().file(`files/${userId}/${docId}`).delete();

    // delete the document from pinecone
    await pineconeClient.deleteIndex(indexName(userId, langchainId));

    // revalidate the cache
    await revalidatePath("/dashboard");

    return {
        success: true,
    }; 
}
