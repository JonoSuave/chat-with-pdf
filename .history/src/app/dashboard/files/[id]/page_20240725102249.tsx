import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../../../../firebaseAdmin";

async function ChatToFilePage({ params: { id } }: { params: { id: string } }) {
	auth().protect(); // Protect this route with Clerk
	const { userId } = await auth();

	const ref = await adminDb.collection("users").doc(userId!).collection("files").doc(id).get();

	const url = ref.data()?.downloadUrl;

	return (
		<div className="grid lg:grid-cols-5 h-full overflow-hidden">
			{/*Right */}
			<div className="lg:col-span-2">{/* Chat */}</div>
			{/* Left */}
			<div>{/* PDFView */}</div>
		</div>
	);
}

export default ChatToFilePage;
