import React from "react";
import firebase from "firebase/app";

function App() {
  const firebaseApp = firebase.apps[0];
  console.log("Try and merge me");
  return (
    <div className="App">
      <p>Tindoori :D</p>
      <h1>React & Firebase</h1>
      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>
    </div>
  );
}

export default App;
