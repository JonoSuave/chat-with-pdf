'use client';

import { Message } from "./Chat";

function ChatMessage({message}: {message: Message}) {
    const isHuman = message.role === "human";
    const {}

  return (
    <div>ChatMessage</div>
  )
}

export default ChatMessage