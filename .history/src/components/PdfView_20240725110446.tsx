"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from "lucide-react";

// We need to configure CORS
// gsutil cors set cors.json gs://<app-name>.appspot.com
// gsutil cors set cors.json gs://chat-with-pdf-challenge-47d60.appspot.com
// go here >>> https://console.cloud.google.com/
// creat new file in editor calls cors.json
// run >>> // gsutil cors set cors.json gs://chat-with-pdf-challenge-47d60.appspot.com
// https://firebase.google.com/docs/storage/web/download-files#cors_configuration

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist${pdfjs.version}/build/pdf.worker.min.js`;

function PdfView({ url }: { url: string }) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [file,]

	return <div>PdfView</div>;
}

export default PdfView;
