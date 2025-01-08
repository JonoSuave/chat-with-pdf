'use server'

import { auth } from "@clerk/nextjs/server"

export async function generateEmbeddings(docId: string) {
    auth().protect(); // Protect this route with Cler
}