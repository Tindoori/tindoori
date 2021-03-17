import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider } from "reactfire";
import firebase from "firebase/app";
import App from "./App/App";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export default firebaseConfig;

// Initialize Firebase
firebase.initializeApp(config);


ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={<h3>Loading...</h3>}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById("root")
);
