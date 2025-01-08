import { auth } from "@clerk/nextjs/server";

async function ChatToFilePage({ params: { id } }: { params: { id: string } }) {
	auth().protect(); // Protect this route with Clerk
	const { userId } = await auth();

    const ref = await adminD

	return <div>ChatToFilePage: {id}</div>;
}

export default ChatToFilePage;
