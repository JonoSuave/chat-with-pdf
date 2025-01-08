"use server";

import { auth } from "@clerk/nextjs/server";

const FREE_LIMIT = 3;
const PRO_LIMIT = 100;

export async function askQuestion(id: string, question: string) {
    auth().protect();
    const { userId } = await auth();
    
    const chatRef = adminDb.collection("users").doc(userId!).collection("files").doc(id).collection("chat");

    //check how many user messages are in the chat
    const chatSnapshot = await chatRef.get();
    const userMessages = chatSnapshot.doc
}