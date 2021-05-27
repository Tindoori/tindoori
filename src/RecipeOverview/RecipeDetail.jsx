import React, { useEffect, useState } from "react";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import firebase from "firebase";
import * as PropTypes from "prop-types";

export default function RecipeDetail({ match }) {
  const [recipe, setRecipe] = useState();
  const recipeid = match.params.id;
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("recipe")
      .doc(recipeid)
      .get()
      .then((doc) => {
        setRecipe(doc.data());
      });
  }, [db, recipeid]);

  return (
    <>
      <br />
      {recipe && (
        <Card id="recipe-card">
          <Card.Img id="recipe-img" src={recipe.imgPath} />
          <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
            <Card.Text className="recipe-description">
              {recipe.description}
            </Card.Text>
            <Card.Header>Ingredients</Card.Header>
            <ListGroup variant="flush">
              {recipe.ingredients.map((ingredient) => (
                <ListGroupItem>{ingredient}</ListGroupItem>
              ))}
            </ListGroup>
            <br />
            <ListGroupItem>
              <Card.Text className="recipe-description">
                Allergies: {recipe.allergies}
              </Card.Text>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Text className="recipe-description">
                dietPreference: {recipe.dietPreference}
              </Card.Text>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Text className="recipe-description">
                MealType: {recipe.mealType}
              </Card.Text>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Text>Cuisine: {recipe.cuisine}</Card.Text>
            </ListGroupItem>
            <ListGroupItem>
              <Card.Text className="recipe-cook-time">
                Cooking time: {recipe.cookingTime} min
              </Card.Text>
            </ListGroupItem>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

RecipeDetail.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
