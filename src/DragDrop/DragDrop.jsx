import React, { useState } from "react";
import { Card, ProgressBar, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import PropTypes from "prop-types";

export default function DragDrop(props) {
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
      const uploadTask = firebase
        .storage()
        .ref(`meals/${files[0].name}`)
        .put(files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const p = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          firebase
            .storage()
            .ref("meals")
            .child(files[0].name)
            .getDownloadURL()
            .then((url) => {
              props.onChange(url);
            });
          setProgress(p);
        },
        () => {
          firebase.storage().ref("meals").child(files[0].name).getDownloadURL();
        }
      );
    }
  };

  // Shows upload field when nothing is uploaded. Else it shows a preview.
  const uploadField = files.length ? (
    <aside className="thumbs-container">{thumbs}</aside>
  ) : (
    <div {...getRootProps()} className="drop-zone">
      {isDragActive
        ? "Drop the image here"
        : "Click here or drag over an image"}
    </div>
  );

  const progressBar =
    progress === 100 ? (
      <p>Image is uploaded</p>
    ) : (
      <div>
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
          <div className="foot">
            {progress === 0 ? (
              <Button onClick={handleUpload}>Upload</Button>
            ) : (
              progressBar
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
DragDrop.propTypes = {
  data: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
