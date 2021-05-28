import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Overview.css";
import firebase from "firebase";

export default function Created() {
  const fs = firebase.firestore();
  const auth = firebase.auth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fs.collection("recipe")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Filter created recipes
          if (doc.data().createdBy === auth.currentUser.uid) {
            setRecipes((prevState) => [...prevState, doc.data()]);
          }
        });
      });
  }, [fs, auth.currentUser.uid]);

  return (
    <>
      <ListGroup id="recipe-overview-list">
        {recipes.map((recipe) => (
          <Card id="recipe-overview-card" key={recipe.id}>
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
    </>
  );
}
