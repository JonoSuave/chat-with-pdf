import { auth } from "@clerk/nextjs/server";
import PlaceholderDocument from "./PlaceholderDocument";

async function Documents() {
	auth().protect(); // Protect this route with Clerk

	const { userId } = await auth();

	if (Q)

	return (
		<div className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
			{/* Mapp through the documents */}
			<PlaceholderDocument />
		</div>
	);
}

export default Documents;
