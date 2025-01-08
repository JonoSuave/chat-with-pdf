'use client'

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { askQuestion, Message } from "@/actions/askQuestion";
import { Loader2Icon } from "lucide-react";
import ChatMessage from "./ChatMessage";


function Chat(id: string) {
  return (
    <div>Chat</div>
  )
}

export default Chat