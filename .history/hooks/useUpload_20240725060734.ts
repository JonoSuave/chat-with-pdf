'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { v4 as uuid } from "uuid";

export enum StatusText {
    UPLOADING = "Uploading file...",
    UPLOADED = "File uploaded successfully!",
    SAVING = "Saving file to database...",
    GENERATING = "Generating AI Embeddings, This will only take a few seconds...",
}

export type Status = StatusText[keyof StatusText];

function useUpload() {
    const [progress, setProgress] = useState<number | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [fileId, setFileId] = useState<Status | null>(null);
    const {user } = useUser();
    const router = useRouter();

    const handleUpload = async (file: File) => {
        if (!file || !user) return;

        // TODO: Free/Pro limitations

        
        
    };
}

export default useUpload