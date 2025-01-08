'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase";
import { ref } from "firebase/storage";

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

        const fileIdToUploadTo = uuidv4(); // example: 123e4567-e89b-12d3-a456-426614174000

        const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);
        
    };
}

export default useUpload