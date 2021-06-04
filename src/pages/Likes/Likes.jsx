import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Likes.css";
import firebase from "firebase";
import PlaceholderCard from "../../components/PlaceholderCard/PlaceholderCard";

export default function Likes() {
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

  return (
    <ListGroup id="liked-recipe-list">
      <PlaceholderCard
        cardTitle="No liked recipes"
        cardBody="All you liked recipes appear here."
      />
      {recipes.map((recipe) => (
        <Card id="liked-recipe-card" key={recipe.id}>
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
