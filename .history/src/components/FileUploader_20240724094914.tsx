"use client";
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function FileUploader() {

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
      }, [])
  return (
    <div>FileUploader</div>
  )
}

export default FileUploader