"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../firebaseAdmin";
import { Message } from "@/components/Chat";
import { generateLangchainCompletion } from "../lib/langchain";
// import { FREE_LIMIT, PRO_LIMIT } from "../../hooks/useSubscription";

const FREE_LIMIT = 3;
const PRO_LIMIT = 100;

export async function askQuestion(id: string, question: string) {
	auth().protect();
	const { userId } = await auth();

	const chatRef = adminDb
		.collection("users")
		.doc(userId!)
		.collection("files")
		.doc(id)
		.collection("chat");

	//check how many user messages are in the chat
	const chatSnapshot = await chatRef.get();
	const userMessages = chatSnapshot.docs.filter((doc) => doc.data().role === "human");

	// Check membership limits for messages in a document
	const userRef = adminDb.collection("users").doc(userId!).get();

	// tomorrow limit the PRO/Free users

	// check if user is on FREE plan and has reached the questions limit
	if (!(await userRef).data()?.hasActiveMembership) {
		if (userMessages.length >= FREE_LIMIT) {
			return {
				success: false,
				message: `You'll need to upgrad to PRO to ask more than ${FREE_LIMIT} questions! 😃 `,
			};
		}
	}

	// check if user is on PRO plan and has reached the questions limit
	if ((await userRef).data()?.hasActiveMembership) {
		if (userMessages.length >= PRO_LIMIT) {
			return {
				success: false,
				message: `You've reached the limit of ${PRO_LIMIT} questions document! 😲  `,
			};
		}
	}

	const userMessage: Message = {
		role: "human",
		message: question,
		createdAt: new Date(),
	};

	await chatRef.add(userMessage);

	// Generate AI Response
	const reply = await generateLangchainCompletion(id, question);

	const aiMessage: Message = {
		role: "ai",
		message: reply,
		createdAt: new Date(),
	};

	await chatRef.add(aiMessage);

	return { success: true, message: null };
}
