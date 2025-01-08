'use server'

import { adminDb, adminStorage } from "../../firebaseAdmin";
import { indexName } from "@/lib/langchain";
import pineconeClient from "@/lib/pinecone";


export async function deleteDocument(docId: string) {

}