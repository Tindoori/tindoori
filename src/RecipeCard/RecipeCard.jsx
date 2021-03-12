import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "./RecipeCard.css";

export default function RecipeCard() {
  const [recipe, setRecipe] = useState([]);
  const fs = firebase.firestore();

  // TODO pass id of specific recipe to this class.
  //  For now you can use "ojsxGQ2A8j4cHSvK8Pwi" or "QIhPRw1ZeNDtCnTCQVl4".
  const recipeId = "ojsxGQ2A8j4cHSvK8Pwi";

  useEffect(() => {
    fs.collection("recipe")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === recipeId) {
            setRecipe(doc.data());
          }
        });
      });
  }, [fs]);

  return (
    <Card className="recipe-card">
      <Card.Img className="recipe-image" src={recipe.imgPath} />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text className="recipe-description">
          {recipe.description}
        </Card.Text>
        <Card.Text className="recipe-cook-time">
          {recipe.cookingTime} min
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
