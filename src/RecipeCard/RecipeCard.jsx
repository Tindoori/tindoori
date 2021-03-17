import React from "react";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import "./RecipeCard.css";
import TinderCard from "react-tinder-card";
import * as PropTypes from "prop-types";

export default function RecipeCard({ recipe }) {
  console.log(recipe);

  const onSwipe = (direction) => {
    // TODO: Replace with a call to the database
    console.log(`you swiped: ${direction}`);
  };

  return (
    <TinderCard onSwipe={onSwipe} preventSwipe={["up", "down"]}>
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
    </TinderCard>
  );
}

// RecipeCard.propTypes = {
//   recipe: PropTypes.instanceOf(Object).isRequired,
// };

RecipeCard.propTypes = {
  recipe: {
    allergies: PropTypes.string,
    cookingTime: PropTypes.string,
    cuisine: PropTypes.string,
    description: PropTypes.string,
    dietPreference: PropTypes.string,
    imgPath: PropTypes.string,
    ingredients: PropTypes.string,
    likeAmount: PropTypes.string,
    mealType: PropTypes.string,
    name: PropTypes.string,
  },
};

RecipeCard.defaultProps = {
  recipe: {},
};
