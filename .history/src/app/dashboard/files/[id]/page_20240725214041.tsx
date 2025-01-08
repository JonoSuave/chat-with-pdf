import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../../../../firebaseAdmin";
import PdfView from "@/components/PdfView";

async function ChatToFilePage({ params: { id } }: { params: { id: string } }) {
	auth().protect(); // Protect this route with Clerk
	const { userId } = await auth();

	const ref = await adminDb.collection("users").doc(userId!).collection("files").doc(id).get();

	const url = ref.data()?.downloadUrl;

	return (
		<div className="grid lg:grid-cols-5 h-full overflow-hidden">
			{/*Right */}
			<div className="lg:col-span-2 overflow-y-auto">
				{/* Chat */}
			<Chat id=
			</div>
			{/* Left */}
			<div className="lg:col-span-3 bg-gray-100 border-r-2 lg:border-indigo-600 lg:-order-1 overlow-auto">{/* PDFView */}
            <PdfView url={url} />
            </div>
		</div>
	);
}

export default ChatToFilePage;
