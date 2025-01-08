'use client'

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dis/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";


function PdfView({url}: {url: string}) {

  return (
    <div>PdfView</div>
  )
}

export default PdfView