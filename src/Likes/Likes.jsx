import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Likes.css";
import firebase from "firebase";
import NavBar from "../NavBar/NavBar";

//  TODO make route private
export default function Likes() {
  const fs = firebase.firestore();
  const auth = firebase.auth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let likedRecipes = [];

    async function fetchLikesData() {
      await fs
        .collection("consumer")
        .doc(auth.currentUser.uid)
        .collection("recipes")
        .doc("recipes")
        .get()
        .then((snapshot) => {
          //    TODO fix bug where no likes causes error
          likedRecipes = snapshot.data().likes;
        });
    }

    fetchLikesData().then(() => {
      fs.collection("recipe")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (likedRecipes.length !== 0) {
              // Filter liked recipes
              if (likedRecipes.includes(doc.id)) {
                setRecipes((prevState) => [...prevState, doc.data()]);
              }
            }
          });
        });
    });
  }, [fs, auth.currentUser.uid]);

  console.log(recipes);

  return (
    <>
      <NavBar />
      <ListGroup id="liked-recipe-list">
        {recipes.map((recipe) => (
          <Card id="liked-recipe-card">
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
