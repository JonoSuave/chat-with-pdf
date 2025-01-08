"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileUploader() {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		// Do something with the files
	}, []);
	const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({ onDrop });
	return (
		<div>
            <div
			{...getRootProps()}
			className={`p-10 border-2 border-indigo-600 border-dashed mt-10 w-[90%] text-indigo-600`}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag 'n' drop some files here, or click to select files</p>
			)}
		</div>
        </div>
	);
}

export default FileUploader;
