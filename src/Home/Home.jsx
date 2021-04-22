import React from "react";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Feed from "../Feed/Feed";
import NavBar from "../NavBar/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <h1>Home</h1>
      <h1> hey you are logged in as : {firebase.auth().currentUser.email}</h1>
      <Feed />
    </>
  );
};

export default Home;
