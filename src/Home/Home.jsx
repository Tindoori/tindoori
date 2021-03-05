/* eslint-disable */
import React from "react";
import firebase from "firebase/app";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    let currentUser = firebase.auth().currentUser;

    function logout() {
        firebase.auth().signOut()
    }

    return (
        <>
            <h1>Home</h1>
            <h1> hey you are logged in as : {currentUser.email}</h1>
            <button type="submit" className="btn btn-danger" onClick={logout}>Sign out</button>
        </>
    );
}

export default Home;
