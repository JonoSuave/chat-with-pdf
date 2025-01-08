import {auth} from "@clerk/nextjs/server";
function ChatToFilePage({ params: { id } }: { params: { id: string } }) {
    
	return <div>ChatToFilePage: {id}</div>;
}

export default ChatToFilePage;
