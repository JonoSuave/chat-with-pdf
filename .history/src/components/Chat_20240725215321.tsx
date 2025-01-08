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
}

function Chat(id: string) {
    const { user } = useUser();

    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isPending, startTransition] = useTransition();

	return <div className="flex flex-col h-full overflow-scroll">
        <div className="flex-1 w-full">
            {/* chat messages... */}
        </div>
        <form>
            <Input
        </form>
    </div>;
}

export default Chat;
