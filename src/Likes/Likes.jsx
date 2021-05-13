import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase";
import NavBar from "../NavBar/NavBar";

//  TODO make route private
export default function Likes() {
  const fs = firebase.firestore();
  const auth = firebase.auth();

  useEffect(() => {
    let likedRecipes = [""];

    async function fetchLikesData() {
      await fs
        .collection("consumer")
        .doc(auth.currentUser.uid)
        .collection("recipes")
        .doc("recipes")
        .get()
        .then((snapshot) => {
          likedRecipes = snapshot.data().likes;
        });
    }

    fetchLikesData().then(() => {
      console.log(likedRecipes);
    });
  }, [fs, auth.currentUser.uid]);

  return (
    <>
      <NavBar />
    </>
  );
}
