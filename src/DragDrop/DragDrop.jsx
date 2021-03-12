/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from "react";
import { Card, ProgressBar, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { storage } from "../FileUpload/FileUpload";
import "bootstrap/dist/css/bootstrap.min.css";

// TODO: generiek schrijven
export default function DragDrop() {
  const [image, setImage] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedImage) => {
    setImage(acceptedImage);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = () => {
    if (image.length !== 0) {
      const uploadTask = storage.ref(`meals/${image[0].name}`).put(image[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const p = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(p);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("meals")
            .child(image[0].name)
            .getDownloadURL()
            .then((url) => {
              // Url of the uploaded image
              setImgUrl(url);
              console.log(imgUrl);
            });
        }
      );
    }
  };

  return (
    <div {...getRootProps()}>
      <Card style={{ width: "18rem" }}>
        <input {...getInputProps()} />
        <Card.Body>
          <Card.Title>Upload image</Card.Title>
          <Card.Text>
            {isDragActive
              ? "Drop the image here ..."
              : "Drag over an image or click to select the image"}
          </Card.Text>
          <Button type="submit" onClick={handleUpload}>
            Upload
          </Button>
        </Card.Body>
        <ProgressBar now={progress} />
      </Card>
    </div>
  );
}
