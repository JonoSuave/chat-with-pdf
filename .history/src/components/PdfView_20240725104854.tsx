"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dis/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from "lucide-react";

// We need to configure CORS
// gsutil cors set cors.json gs://<app-name>.appspot.com
// gsutil cors set cors.json gs://chat-with-pdf-challenge-47d60.appspot.com
// go here 

function PdfView({ url }: { url: string }) {
	return <div>PdfView</div>;
}

export default PdfView;
