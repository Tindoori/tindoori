/* eslint-disable */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase";
import NavBar from "../NavBar/NavBar";
import {ListGroup} from "react-bootstrap";

//  TODO make route private
export default function Likes() {
  const fs = firebase.firestore();
  const auth = firebase.auth();
  const [recipes, setRecipes] = useState([]);

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
          // likedRecipes.push(snapshot.data().likes);
          likedRecipes = snapshot.data().likes;
        });
    }

    fetchLikesData().then(() => {
      fs.collection("recipe")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if (likedRecipes.length !== 0) {
                  // Filter liked recipes
                  if (likedRecipes.includes(doc.id)) {
                      setRecipes((prevState) => [...prevState, doc.data()]);
                  }
              }
          });
        });
    });
  }, [fs, auth.currentUser.uid]);


    console.log(recipes);

  return (
    <>
      <NavBar />
        <div id="liked-recipes-list">
            <ListGroup>
                {/*{recipes.map((recipe) => (*/}
                {/*))}*/}
            </ListGroup>
        </div>
    </>
  );
}
