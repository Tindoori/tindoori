import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Card() {
  const db = firebase.firestore();
  const [recipe, setRecipe] = useState([]);
  const id = "QIhPRw1ZeNDtCnTCQVl4";

  useEffect(() => {
    db.collection("recipe")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === id) {
            setRecipe(doc.data());
          }
        });
      });
  }, [db]);

  const style = {
    backgroundColor: "#FFFFFF",
    border: "2px solid #F0F0F0",
    borderRadius: "3px",
    width: "644px",
    height: "438px",
  };

  return (
    <div style={style} className="card">
      <img width="100%" height="65%" src={recipe.imgPath} alt="recipe" />
      <h1 className="dish-title">{recipe.name}</h1>
      <p className="dish-description">{recipe.description}</p>
      <p className="dish-cook-time">{recipe.cookingTime} min</p>
    </div>
  );
}
