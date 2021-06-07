import React, { useEffect, useState } from "react";
import { Card, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Likes.css";
import firebase from "firebase";
import { useHistory } from "react-router";

export default function Likes() {
  const history = useHistory();
  const fs = firebase.firestore();
  const auth = firebase.auth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let likedRecipes;

    async function fetchLikesData() {
      await fs
        .collection("consumer")
        .doc(auth.currentUser.uid)
        .collection("recipes")
        .doc("recipes")
        .get()
        .then((snapshot) => {
          if (snapshot.data().likes !== null) {
            likedRecipes = snapshot.data().likes;
          }
        });
    }

    fetchLikesData().then(() => {
      fs.collection("recipe")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (likedRecipes == null) likedRecipes = [""];

            // Filter liked recipes
            if (likedRecipes.includes(doc.id)) {
              setRecipes((prevState) => [...prevState, doc.data()]);
            }
          });
        });
    });
  }, [fs, auth.currentUser.uid]);

  const getRecipeId = (id) => {
    console.log(id);
    history.push(`/recipedetail/${id}`);
  };

  return (
    <>
      <ListGroup id="liked-recipe-list">
        <Form.Label className="text-center">
          Click on the card to view the recipe details.
        </Form.Label>
        {recipes.map((recipe) => (
          <Card
            id="liked-recipe-card"
            key={recipe.id}
            onClick={() => getRecipeId(recipe.id)}
          >
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
