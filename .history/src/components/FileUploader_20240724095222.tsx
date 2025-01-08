"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileUploader() {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		// Do something with the files
	}, []);
	const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({ onDrop });
	return (
		<div {...getRootProps()}
        className={``}
        >
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag 'n' drop some files here, or click to select files</p>
			)}
		</div>
	);
}

export default FileUploader;
