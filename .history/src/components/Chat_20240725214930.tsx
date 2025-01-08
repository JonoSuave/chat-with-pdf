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

function Chat(id: string) {
    const { user } = useUser();

    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

	return <div>Chat</div>;
}

export default Chat;
