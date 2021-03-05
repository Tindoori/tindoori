/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
// import firebase from "firebase/";
import Dropzone from "react-dropzone";

export default function CreateRecipe() {
  // const storageRef = firebase.storage().ref();
  // // Create a reference to 'mountains.jpg'
  // const mountainsRef = storageRef.child("mountains.jpg");
  // // Create a reference to 'images/mountains.jpg'
  // const mountainImagesRef = storageRef.child("meals/mountains.jpg");
  // // While the file names are the same, the references point to different files
  // mountainsRef.name === mountainImagesRef.name; // true
  // mountainsRef.fullPath === mountainImagesRef.fullPath; // false

  return (
    <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
