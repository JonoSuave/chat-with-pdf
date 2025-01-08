"use client";

import { useUser } from "@clerk/nextjs";
import { Message } from "./Chat";
import Image from "next/image";
import { BotIcon, Loader2Icon } from "lucide-react";
import Markdown from "react-markdown";

function ChatMessage({ message }: { message: Message }) {
	const isHuman = message.role === "human";
	const { user } = useUser();

	return (
		<div className={`chat ${isHuman ? "chat-end" : "chat-start"}`}>
			<div className="chat-image avatar">
				<div>
					{isHuman ? (
						user?.imageUrl && (
							<Image
								src={user.imageUrl}
								alt="Prole Picture"
								width={40}
								height={40}
								className="rounded-full"
							/>
						)
					) : (
						<div className="h-10 w-10 bg-indigo-600 flex items-center justify-center">
							<BotIcon className="text-white h-7 w-7" />
						</div>
					)}
				</div>
			</div>

			<div className={`chat-buble prose ${isHuman && "bg-indigo-600 text-wh"}`}></div>
		</div>
	);
}

export default ChatMessage;
