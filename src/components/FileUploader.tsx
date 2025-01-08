"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileIcon, UploadIcon } from "lucide-react";
import { toast } from "./ui/use-toast";
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { DocumentTable, Document } from "./DocumentTable";
import { processDocumentClassification } from "@/actions/classifyDocument";
import { useUser } from "@clerk/nextjs";

function FileUploader() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useUser();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0 || !user) return;
    setUploading(true);

    try {
      for (const file of acceptedFiles) {
        // Create storage reference
        const storageRef = ref(storage, `users/${user.id}/documents/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Upload file
        const url = await new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (error) {
                reject(error);
              }
            }
          );
        });

        // Add document to Firestore
        const userDocumentsRef = collection(db, "users", user.id, "files");
        const docRef = await addDoc(userDocumentsRef, {
          name: file.name,
          size: file.size,
          url,
          classification: "Processing...",
          createdAt: serverTimestamp(),
          status: "processing",
        });

        // Add to local state
        const newDoc = {
          id: docRef.id,
          name: file.name,
          size: file.size,
          url,
          classification: "Processing...",
          createdAt: new Date(),
        };
        setDocuments((prev) => [...prev, newDoc]);

        // Start document classification
        const result = await processDocumentClassification(
          user.id,
          docRef.id,
          url
        );

        if (result.success) {
          // Update local state with classification result
          setDocuments((prev) =>
            prev.map((doc) =>
              doc.id === docRef.id
                ? { ...doc, classification: result.classification }
                : doc
            )
          );
        } else {
          toast({
            variant: "destructive",
            title: "Classification Error",
            description: result.error,
          });
        }
      }

      toast({
        title: "Success",
        description: "Files uploaded successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload files",
      });
    } finally {
      setUploading(false);
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${uploading ? "pointer-events-none opacity-50" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <UploadIcon className="h-8 w-8 text-gray-500" />
          <p className="text-sm text-gray-500">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop files here, or click to select files"}
          </p>
        </div>
      </div>
      <DocumentTable documents={documents} onDelete={async (id) => {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      }} />
    </div>
  );
}

export default FileUploader;
