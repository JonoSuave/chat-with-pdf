import {auth} from "@clerk/nextjs/server";
function ChatToFilePage({ params: { id } }: { params: { id: string } }) {
    auth().protect(); // Protect this route with Clerk
    const { userId } 

	return <div>ChatToFilePage: {id}</div>;
}

export default ChatToFilePage;
