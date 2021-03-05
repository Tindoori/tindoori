/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../FileUpload/FileUpload";

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
    <div>
      <progress value={progress} max="100" />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag over an image or click to select the image</p>
        )}
      </div>
      <button type="submit" onClick={handleUpload}>
        Upload!
      </button>
    </div>
  );
}
