import {auth} from "@clerk/nextjs/server";
function ChatToFilePage({ params: { id } }: { params: { id: string } }) {
    auth().protect(); // Protect this route with Clerk

    
	return <div>ChatToFilePage: {id}</div>;
}

export default ChatToFilePage;
