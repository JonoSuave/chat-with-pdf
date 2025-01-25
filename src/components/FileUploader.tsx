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
  const [classifying, setClassifying] = useState(false);
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
          classification: "Pending",
          createdAt: serverTimestamp(),
          status: "pending",
        });

        // Add to local state
        const newDoc = {
          id: docRef.id,
          name: file.name,
          size: file.size,
          url,
          classification: "Pending",
          createdAt: new Date(),
        };
        setDocuments((prev) => [...prev, newDoc]);
      }

      toast({
        title: "Success",
        description: "Files uploaded successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error uploading files",
      });
    } finally {
      setUploading(false);
    }
  }, [user]);

  const classifyDocuments = async () => {
    if (!user || classifying) return;
    setClassifying(true);

    try {
      const pendingDocs = documents.filter(doc => doc.classification === "Pending");
      
      for (const doc of pendingDocs) {
        const result = await processDocumentClassification(
          user.id,
          doc.id,
          doc.url
        );

        if (result.success) {
          setDocuments((prev) =>
            prev.map((d) =>
              d.id === doc.id
                ? { ...d, classification: result.classification }
                : d
            )
          );
        } else {
          toast({
            variant: "destructive",
            title: "Classification Error",
            description: `Error classifying ${doc.name}: ${result.error}`,
          });
        }
      }

      toast({
        title: "Success",
        description: "Documents classified successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error classifying documents",
      });
    } finally {
      setClassifying(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <>Loading...</>
        ) : (
          <>
            <UploadIcon className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF files here</p>
          </>
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold">Your Documents</h2>
          {documents.some(doc => doc.classification === "Pending") && (
            <button
              onClick={classifyDocuments}
              disabled={classifying}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {classifying ? "Classifying..." : "Classify Documents"}
            </button>
          )}
        </div>
        <DocumentTable documents={documents} onDelete={async (id) => {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      }} />
      </div>
    </div>
  );
}

export default FileUploader;
