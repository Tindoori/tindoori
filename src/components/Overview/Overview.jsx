import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup } from "react-bootstrap";
import "../RecipeCard/RecipeCard.css";
import PropTypes from "prop-types";
import PlaceholderCard from "../Placeholder/Placeholder";

export default function Overview({ recipes }) {
  return (
    <ListGroup id="overview-recipe-list">
      <PlaceholderCard
        cardTitle="No recipes yet!"
        cardBody="Your recipes will appear here."
      />
      {recipes.map((recipe) => (
        <Card id="overview-recipe-card" key={recipe.id}>
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
      ))}
    </ListGroup>
  );
}

Overview.propTypes = {
  recipes: PropTypes.instanceOf(Object).isRequired,
};
