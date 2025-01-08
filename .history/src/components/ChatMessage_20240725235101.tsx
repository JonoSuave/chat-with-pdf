'use client';

import { useUser } from "@clerk/nextjs";
import { Message } from "./Chat";

function ChatMessage({message}: {message: Message}) {
    const isHuman = message.role === "human";
    const { user } = useUser();

  return (
    <div>ChatMessage</div>
  )
}

export default ChatMessage