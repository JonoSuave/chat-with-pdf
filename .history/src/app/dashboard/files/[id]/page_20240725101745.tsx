import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../../../../firebaseAdmin";

async function ChatToFilePage({ params: { id } }: { params: { id: string } }) {
	auth().protect(); // Protect this route with Clerk
	const { userId } = await auth();

    const ref = await adminDb.collection()

	return <div>ChatToFilePage: {id}</div>;
}

export default ChatToFilePage;
