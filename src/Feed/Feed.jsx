import React, { useEffect, useState } from "react";
import firebase from "firebase";
import SwipeButton from "../SwipeButton/SwipeButton";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./Feed.css";

export default function Feed() {
  const fs = firebase.firestore();
  const [recipes, setRecipes] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    fs.collection("recipe")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Stores all recipes from database
          setRecipes((prevState) => [...prevState, doc.data()]);
          setIds((prevState) => [...prevState, doc.id]);
        });
      });
  }, [fs]);

  return (
    <div id="feed">
      <div>
        {recipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={ids[index]} />
        ))}
      </div>
      <SwipeButton action="dislike" />
      <SwipeButton action="like" />
    </div>
  );
}
