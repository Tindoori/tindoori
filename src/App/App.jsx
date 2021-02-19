import React from "react";
import firebase from "firebase/app";
import Card from "./Card/Card";

function App() {
  const firebaseApp = firebase.apps[0];
  return (
    <div className="App">
      <Card />
      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>
    </div>
  );
}

export default App;
