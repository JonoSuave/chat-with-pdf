'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { processDocumentClassification } from "@/actions/classifyDocument";

export enum StatusText {
    UPLOADING = "Uploading files...",
    UPLOADED = "Files uploaded successfully!",
    SAVING = "Saving files to database...",
    CLASSIFYING = "Classifying document with Azure AI...",
    CLASSIFIED = "Document classified successfully!",
    ERROR = "An error occurred during processing"
}

export type Status = StatusText[keyof StatusText];

function useUpload() {
    const [progress, setProgress] = useState<number | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [fileId, setFileId] = useState<string | null>(null);
    const { user } = useUser();
    const router = useRouter();

    const handleUpload = async (file: File) => {
        if (!file || !user) return;

        const fileIdToUploadTo = uuidv4();
        const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setStatus(StatusText.UPLOADING);
                setProgress(percent);
            },
            (error) => {
                console.error("Error uploading file", error);
                setStatus(StatusText.ERROR);
            },
            async () => {
                try {
                    setStatus(StatusText.UPLOADED);
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

                    setStatus(StatusText.SAVING);
                    await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        downloadUrl,
                        ref: uploadTask.snapshot.ref.fullPath,
                        createdAt: new Date(),
                        status: "pending_classification",
                    });

                    setStatus(StatusText.CLASSIFYING);
                    const classificationResult = await processDocumentClassification(
                        user.id,
                        fileIdToUploadTo,
                        downloadUrl
                    );

                    if (classificationResult.success) {
                        setStatus(StatusText.CLASSIFIED);
                        console.log("Classification result:", classificationResult);
                    } else {
                        setStatus(StatusText.ERROR);
                        console.error("Classification error:", classificationResult.error);
                    }

                    setFileId(fileIdToUploadTo);
                } catch (error) {
                    console.error("Error processing file:", error);
                    setStatus(StatusText.ERROR);
                }
            }
        );
    };

    return { progress, status, fileId, handleUpload };
}

export default useUpload;