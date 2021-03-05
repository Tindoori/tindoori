import React from "react";
import firebase from "firebase/app";
import CreateRecipe from "../CreateRecipe/CreateRecipe";

function App() {
  const firebaseApp = firebase.apps[0];
  return (
    <div className="App">
      <CreateRecipe />
      <p>Tindoori :D</p>
      <h1>React & Firebase</h1>
      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>
    </div>
  );
}

export default App;
