'use server'

import { adminDb, adminStorage } from "../../firebaseAdmin";
import { indexName } from "@/lib/langchain";
import pineconeClient from "@/lib/pinecone";
import { aut}

export async function deleteDocument(docId: string) {

}