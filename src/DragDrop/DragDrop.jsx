/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DragDrop() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag over a files or click to select files</p>
      )}
      <button type="submit">Upload!</button>
    </div>
  );
}
