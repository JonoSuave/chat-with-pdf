'use server'

import { adminDb, adminStorage } from "../../firebaseAdmin";
import { indexName } from "@/lib/langchain";
import pineconeClient from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";


export async function deleteDocument(docId: string) {

}