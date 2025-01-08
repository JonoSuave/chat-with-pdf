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
                    <Image src={user?.primaryEmailAddress?.profileImageUrl} width={40} height={40} alt="User avatar" />
                ) : (
                    <BotIcon size={40} />
                )}
            </div>
        </div>
        <div></div>
    </div>;
}

export default ChatMessage;
