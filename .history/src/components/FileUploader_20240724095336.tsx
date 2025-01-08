"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileUploader() {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		// Do something with the files
	}, []);
	const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({ onDrop });
	return (
		
	);
}

export default FileUploader;
