import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Card() {
  const db = firebase.firestore();
  const [recipe, setRecipe] = useState([]);

  // TODO pass id of specific recipe to this class. For now you can use "ojsxGQ2A8j4cHSvK8Pwi" or "QIhPRw1ZeNDtCnTCQVl4".
  const recipeId = "ojsxGQ2A8j4cHSvK8Pwi";

  useEffect(() => {
    db.collection("recipe")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === recipeId) {
            setRecipe(doc.data());
          }
        });
      });
  }, [db]);

  const style = {
    card: {
      backgroundColor: "#FFFFFF",
      border: "2px solid #F0F0F0",
      borderRadius: "3px",
      width: "644px",
      height: "438px",
    },

    text: {
      maxLines: 1,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },

    image: {
      width: "100%",
      height: "65%",
    },
  };

  return (
    <div className="card" style={style.card}>
      <img
        className="card-img-top"
        src={recipe.imgPath}
        alt="recipe"
        style={style.image}
      />
      <div className="card-body">
        <h1 className="dish-title">{recipe.name}</h1>
        <p className="dish-description" style={style.text}>
          {recipe.description}
        </p>
        <p className="dish-cook-time">{recipe.cookingTime} min</p>
      </div>
    </div>
  );
}
