'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

        // TODO
        setStatus(StatusText.UPLOADING);
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${user.publicMetadata?.token}`,
            },
        });

        if (response.ok) {
            setStatus(StatusText.UPLOADED);
            const { fileId } = await response.json();
            setFileId(fileId);
            setStatus(StatusText.SAVING);

            const saveResponse = await fetch("/api/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.publicMetadata?.token}`,
                },
                body: JSON.stringify({ fileId }),
            });

            if (saveResponse.ok) {
                setStatus(StatusText.GENERATING);
                const { success } = await saveResponse.json();
                if (success) {
                    router.push(`/dashboard/${fileId}`);
                }
            }
        }
    };
}

export default useUpload