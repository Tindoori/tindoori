/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../FileUpload/FileUpload";

// TODO: generiek schrijven
export default function DragDrop() {
  const onDrop = useCallback((acceptedImage) => {
    setImage(acceptedImage);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [image, setImage] = useState([]);
  const [imgUrl, setImgUrl] = useState("");

  console.log(image);

  const handleUpload = () => {
    if (image.length !== 0) {
      console.log(image[0].name);
      const uploadTask = storage.ref(`meals/${image[0].name}`).put(image[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
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
              setImgUrl(url);
            });
        }
      );
    }
  };

  return (
    <div>
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
