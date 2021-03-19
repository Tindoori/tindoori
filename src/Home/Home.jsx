import React from "react";
import firebase from "firebase/app";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  function logout() {
    firebase.auth().signOut();
  }

  return (
    <>
      <h1>Home</h1>
      <h1> hey you are logged in as : {firebase.auth().currentUser.email}</h1>
      <Button type="submit" variant="danger" onClick={logout}>
        Sign out
      </Button>
    </>
  );
};

export default Home;