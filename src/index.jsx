/* eslint-env browser */
import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import App from "./App/App";

const firebaseConfig = {
  apiKey: "AIzaSyBf6OsN4SadERSrtV__C_RsEEP8o7m6g-8",
  authDomain: "tindoori-f61e7.firebaseapp.com",
  projectId: "tindoori-f61e7",
  storageBucket: "tindoori-f61e7.appspot.com",
  messagingSenderId: "1071643654171",
  appId: "1:1071643654171:web:0b224aaf2f4c829d8da0be",
  measurementId: "G-FR5H100XTC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
