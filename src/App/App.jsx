import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "firebase/app";
import Login from "../Login/Login";
import Home from "../Home/Home";
import { AuthProvider } from "../Auth";
import PrivateRoute from "../PrivateRoute";

function App() {
  const firebaseApp = firebase.apps[0];
  console.log(firebaseApp);
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
      </Router>
    </AuthProvider>
  );
}

export default App;
