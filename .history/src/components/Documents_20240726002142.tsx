import { auth } from "@clerk/nextjs/server";
import PlaceholderDocument from "./PlaceholderDocument";
import { adminDb } from "../../firebaseAdmin";

async function Documents() {
	auth().protect(); // Protect this route with Clerk

	const { userId } = await auth();

	if (!userId) {
		throw new Error("No user ID found");
	}

	const documentsSnapshot = await adminDb.collection("users").doc(userId).collection("files").get();

	return (
		<div className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
			{/* Mapp through the documents */}
{documentsSnapshot.docs.map((doc) => {
	const {name, downloadUrl, size} = doc.data();

	return (
		<Document />
	)
}}

			<PlaceholderDocument />
		</div>
	);
}

export default Documents;
