import React, { useEffect, useState } from "react";
import firebase from "firebase";
import SwipeButton from "../SwipeButton/SwipeButton";
import RecipeCard from "../RecipeCard/RecipeCard";

export default function Feed() {
  const fs = firebase.firestore();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fs.collection("recipe")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setRecipes((prevState) => [...prevState, doc.data()]);
        });
      });
  }, [fs]);

  console.log(recipes);

  return (
    <div>
      <div className="cardContrainer">
        {recipes.map((recipe) => (
          <RecipeCard
            className="recipe-feed"
            recipe={recipe}
            key={recipe.name}
          />
        ))}
      </div>
      <SwipeButton action="dislike" />
      <SwipeButton action="like" />
    </div>
  );
}
