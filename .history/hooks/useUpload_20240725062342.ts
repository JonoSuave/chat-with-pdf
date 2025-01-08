'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

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
        
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setStatus(StatusText.UPLOADING);
            setProgress(percent);
        }, (error) => {
            console.error("Error uploading file", error);
        },async () => {
            setStatus(StatusText.UPLOADED);

            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

            setStatus(StatusText.SAVING);
            await setDoc(doc(db, "users", user.id, 'files', fileIdToUploadTo),{
                name: file.name,
                size: file.size,
                createdAt: new Date(),
            });
            })

        });
    };
}

export default useUpload