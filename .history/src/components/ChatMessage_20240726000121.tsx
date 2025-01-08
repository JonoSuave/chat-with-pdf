"use client";

import { useUser } from "@clerk/nextjs";
import { Message } from "./Chat";
import Image from "next/image";
import { BotIcon, Loader2Icon } from "lucide-react";
import Markdown from "react-markdown";

function ChatMessage({ message }: { message: Message }) {
	const isHuman = message.role === "human";
	const { user } = useUser();

	return <div className={`chat ${isHuman ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
            <div>
                {isHuman ? (
                    user?.imageUrl && <Image
                    src={user.imageUrl}
                    alt="Prole Picture"
                    width={40}
                    height={40}
                    className="rounded-full"
                    />
                ) : (
                    <div><BotIcon size={40} /></div>
                )}
            </div>
        </div>
        <div></div>
    </div>;
}

export default ChatMessage;
