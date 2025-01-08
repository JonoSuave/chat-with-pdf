"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import { askQuestion, Message } from "@/actions/askQuestion";
import { Loader2Icon } from "lucide-react";
// import ChatMessage from "./ChatMessage";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { db } from "../../firebase";
import { collection, orderBy, query } from "firebase/firestore";

export type Message = {
	id?: string;
	role: "human" | "ai" | "placeholder";
	message: string;
	createdAt: Date;
};

function Chat({ id }: { id: string }) {
	const { user } = useUser();

	const [input, setInput] = useState<string>("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isPending, startTransition] = useTransition();

	const [snapshot, loading, error] = useCollection(
		user &&
			query(collection(db, "users", user?.id, "files", id, "chat"), orderBy("createdAt", "asc"))
	);

    useEffect(() => {
        if (!snapshot) return;
        console.log("Updated")
    }, [snapshot]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
	};

	return (
		<div className="flex flex-col h-full overflow-scroll">
			<div className="flex-1 w-full">{/* chat messages... */}</div>
			<form onSubmit={handleSubmit} className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-600/75">
				<Input
					placeholder="Ask a question..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<Button type="submit" disabled={!input.trim() || isPending}>
					{isPending ? <Loader2Icon className="animate-spin text-indigo-600" /> : "Ask"}
				</Button>
			</form>
		</div>
	);
}

export default Chat;
