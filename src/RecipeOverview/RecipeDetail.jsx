/*eslint-disable */

import React, { useEffect, useState } from "react";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Spinner } from "react-bootstrap";
import TinderCard from "react-tinder-card";
import * as PropTypes from "prop-types";
import firebase from "firebase";

export default function RecipeOverview({ match }) {
  const [recipe, setRecipe] = useState();
  const recipeid = match.params.id;
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("recipe")
      .doc(recipeid)
      .get()
      .then((doc) => {
        setRecipe(doc.data())
      });
  }, [db]);

  return (
    <>
      {recipe && (
        <Card id="recipe-card">
          <Card.Img id="recipe-img" />
          <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
            <Card.Text className="recipe-description">
              {recipe.description}
            </Card.Text>
            <Card.Text className="recipe-description">
              {recipe.allergies}
            </Card.Text>
            <Card.Text className="recipe-description">
              {recipe.dietPreference}
            </Card.Text>
            <Card.Text className="recipe-description">
              {recipe.mealType}
            </Card.Text>
            <Card.Text className="recipe-cook-time">
              {recipe.cookingTime} min
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
