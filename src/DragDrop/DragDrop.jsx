/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Card, ProgressBar, Button, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { storage } from "../Firebase/Firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

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
    <div className="thumb" key={file.name}>
      <div className="thumb-inner">
        <img className="img" src={file.preview} alt="" />
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

  // Shows upload field when nothing is uploaded. Else it shows a preview.
  const uploadField = files.length ? (
    <aside className="thumbs-container">{thumbs}</aside>
  ) : (
    <div>
      <Form {...getRootProps()}>
        <Form.File
          label={isDragActive ? "Drop the image here" : "Drag over an image"}
          custom
        />
      </Form>
    </div>
  );

  const progressBar =
    progress === 100 ? (
      <p>image is uploaded</p>
    ) : (
      <div>
        <Button onClick={handleUpload}>Upload</Button>
        <ProgressBar now={progress} />
      </div>
    );

  return (
    <div>
      <Card className="card">
        <input {...getInputProps()} />
        <Card.Body>
          <Card.Title>Upload image</Card.Title>
          {uploadField}
          {progressBar}
        </Card.Body>
      </Card>
    </div>
  );
}
