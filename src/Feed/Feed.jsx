import React, { useEffect, useState } from "react";
import firebase from "firebase";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./Feed.css";

export default function Feed() {
  const fs = firebase.firestore();
  const auth = firebase.auth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let recipesToFilter = [""];

    async function fetchConsumerData() {
      await fs
        .collection("consumer")
        .doc(auth.currentUser.uid)
        .collection("recipes")
        .doc("recipes")
        .get()
        .then((snapshot) => {
          const consumerRecipeData = Object.values(snapshot.data());

          for (let i = 0; i < consumerRecipeData.length; i += 1) {
            recipesToFilter = recipesToFilter.concat(consumerRecipeData[i]);
          }
        });
    }

    fetchConsumerData().then(() =>
      fs
        .collection("recipe")
        .where("id", "not-in", recipesToFilter)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Stores all recipes from database
            setRecipes((prevState) => [...prevState, doc.data()]);
          });
        })
    );
  }, [fs, auth.currentUser.uid]);

  return (
    <div id="feed">
      <div id="card-container">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
}
