'use server'

import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import buildClassifier from "@/lib/azure-doc-intelligence";

export async function processDocumentClassification(
    userId: string,
    fileId: string,
    documentUrl: string
) {
    // Get document reference outside try-catch
    const docRef = doc(db, "users", userId, "files", fileId);
    
    try {
        // Update status to processing
        await updateDoc(docRef, {
            status: "processing",
            updatedAt: new Date(),
        });

        // Analyze the document
        const result = await buildClassifier(documentUrl);

        // Update document with analysis results
        await updateDoc(docRef, {
            status: "analyzed",
            classification: result.docType,
            confidence: result.confidence,
            updatedAt: new Date(),
        });

        return {
            success: true,
            status: "analyzed",
            classification: result.docType
        };
    } catch (error) {
        // Update document with error status
        await updateDoc(docRef, {
            status: "error",
            error: error instanceof Error ? error.message : 'Unknown error',
            updatedAt: new Date(),
        });

        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}
