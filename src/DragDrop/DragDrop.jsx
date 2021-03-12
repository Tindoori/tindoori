/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Card, ProgressBar, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { storage } from "../Firebase/Firebase";
import "bootstrap/dist/css/bootstrap.min.css";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function DragDrop() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  // Initialise dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  // Creates thumbnail for all images
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));

  const handleUpload = () => {
    if (files.length !== 0) {
      const uploadTask = storage.ref(`meals/${files[0].name}`).put(files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const p = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(p);
        },
        () => {
          storage.ref("meals").child(files[0].name).getDownloadURL();
        }
      );
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <input {...getInputProps()} />
      <Card.Body>
        <Card.Title>Upload image</Card.Title>
        {files.length ? (
          <aside style={thumbsContainer}>{thumbs}</aside>
        ) : (
          <Card.Text {...getRootProps()}>
            {isDragActive
              ? "Drop the image here ..."
              : "Drag over an image or click to select the image"}
          </Card.Text>
        )}
        {progress === 100 ? (
          <p>image is uploaded</p>
        ) : (
          <div>
            <Button onClick={handleUpload}>Upload</Button>
            <ProgressBar now={progress} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
