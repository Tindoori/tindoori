import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/Overview/Overview.css";
import firebase from "firebase";
import Overview from "../../components/Overview/Overview";

export default function Likes() {
  const fs = firebase.firestore();
  const auth = firebase.auth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let likedRecipes;

    async function fetchLikesData() {
      await fs
        .collection("consumer")
        .doc(auth.currentUser.uid)
        .collection("recipes")
        .doc("recipes")
        .get()
        .then((snapshot) => {
          if (snapshot.data().likes !== null) {
            likedRecipes = snapshot.data().likes;
          }
        });
    }

    fetchLikesData().then(() => {
      fs.collection("recipe")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (likedRecipes == null) likedRecipes = [""];

            // Filter liked recipes
            if (likedRecipes.includes(doc.id)) {
              setRecipes((prevState) => [...prevState, doc.data()]);
            }
          });
        });
    });
  }, [fs, auth.currentUser.uid]);

  return (
    <>
      <Overview recipes={recipes} />
    </>
  );
}
