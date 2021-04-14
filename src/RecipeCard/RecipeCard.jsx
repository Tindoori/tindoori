import React from "react";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "./RecipeCard.css";
import TinderCard from "react-tinder-card";
import * as PropTypes from "prop-types";

export default function RecipeCard({ recipe }) {
  const onSwipe = (direction) => {
    // TODO: Replace with a call to the database
    console.log(`you swiped: ${direction}`);
  };

  return (
    <TinderCard
      className="swipe"
      onSwipe={onSwipe}
      preventSwipe={["up", "down"]}
    >
      <Card id="recipe-card">
        <Card.Img id="recipe-img" src={recipe.imgPath} />
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
    </TinderCard>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};
