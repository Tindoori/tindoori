import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "./utils/Firebase/config";
import App from "./components/App/App";

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
