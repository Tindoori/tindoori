import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

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

  const style = {
    card: {
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
      width: "644px",
      height: "298px",
    },
  };

  return (
    <Card style={style.card}>
      <Card.Img
        variant="top"
        src={recipe.imgPath}
        width={style.image.width}
        height={style.image.height}
      />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text className="description" style={style.text}>
          {recipe.description}
        </Card.Text>
        <Card.Text className="cook-time">{recipe.cookingTime} min</Card.Text>
      </Card.Body>
    </Card>
  );
}
