import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import "./CreateRecipe.css";
import firebase from "firebase";
import { Redirect } from "react-router";
import DragDrop from "../DragDrop/DragDrop";

export default function CreateRecipe() {
  const [imgPathValue, setImgPathValue] = useState("");
  const [error, setError] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [isImgUploaded, setIsImgUploaded] = useState(true);
  const [ingredient, setIngredient] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (imgPathValue) {
      const { recipeName, description, cookingTime } = event.target.elements;

      const ref = firebase.firestore().collection("recipe").doc();
      const userUid = firebase.auth().currentUser.uid;
      ref
        .set({
          id: ref.id,
          imgPath: imgPathValue,
          name: recipeName.value,
          description: description.value,
          cookingTime: cookingTime.value,

          ingredients: ingredient,

          ingredients: ingredients.value,
          createdBy: userUid,

        })
        .catch((e) => setError(e));

      setIsValidated(true);
    } else {
      setIsImgUploaded(false);
    }
  };

  if (isValidated === true) {
    return <Redirect to="/" />;
  }

  const onChange = (data) => {
    setImgPathValue(data);
  };

  const handleIngredients = (e) => {
    setIngredient(e.target.value.split(","));
  };

  return (
    <Card id="create-recipe-card">
      <Card.Title>Create a recipe</Card.Title>
      <Form className="recipe-form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Recipe image:</Form.Label>
          <DragDrop
            data={imgPathValue}
            onChange={(e) => {
              onChange(e);
            }}
          />
          {!isImgUploaded && (
            <Alert variant="danger" role="alert">
              Please upload an image before proceeding.
            </Alert>
          )}
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
          <Form.Label>Cooking time in minutes:</Form.Label>
          <Form.Control
            type="number"
            min="0"
            placeholder="E.g: 30"
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
            as="textarea"
            onChange={handleIngredients}
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
  );
}
