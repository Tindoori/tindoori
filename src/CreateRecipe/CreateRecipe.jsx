import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import "./CreateRecipe.css";
import firebase from "firebase";
import { Redirect } from "react-router";

export default function CreateRecipe() {
  const [error, setError] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      recipeName,
      description,
      cookingTime,
      ingredients,
    } = event.target.elements;

    firebase
      .firestore()
      .collection("recipe")
      .doc()
      .set({
        name: recipeName.value,
        description: description.value,
        cookingTime: cookingTime.value,
        ingredients: ingredients.value,
      })
      .catch((e) => setError(e));

    setIsValidated(true);
    console.log(
      // imgPath,
      recipeName.value,
      description.value,
      cookingTime.value,
      ingredients.value
    );
  };

  if (isValidated === true) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Card id="create-recipe-card">
        <Card.Title>Create a recipe</Card.Title>
        <Form className="recipe-form" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Recipe image:</Form.Label>
            {/* <DragDrop handleUpload={setImagePath} /> */}
          </Form.Group>
          <Form.Group controlId="formName" id="recipe-form-group">
            <Form.Label>Recipe name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.g: pasta pesto"
              name="recipeName"
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription" id="recipe-form-group">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.g: A very tasty dish"
              name="description"
              required
            />
          </Form.Group>
          <Form.Group controlId="formCookingTime" id="recipe-form-group">
            <Form.Label>Cooking time:</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.g: 30 minutes"
              name="cookingTime"
              required
            />
          </Form.Group>
          <Form.Group controlId="formIngredients" id="recipe-form-group">
            <Form.Label>Ingredients:</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.g: pasta, pesto, zucchini"
              name="ingredients"
              required
            />
          </Form.Group>
          {error && (
            <Alert variant="danger" role="alert">
              {error.message}
            </Alert>
          )}
          <Button id="recipe-form-button" variant="danger" type="submit" block>
            Create recipe
          </Button>
        </Form>
      </Card>
    </>
  );
}
