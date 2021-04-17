import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import DragDrop from "../DragDrop/DragDrop";
import "./CreateRecipe.css";

export default function CreateRecipe() {
  const [imgPath, setImagePath] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      recipeName,
      description,
      cookingTime,
      ingredients,
    } = event.target.elements;

    console.log(
      imgPath,
      recipeName.value,
      description.value,
      cookingTime.value,
      ingredients.value
    );
  };

  return (
    <>
      <Card id="create-recipe-card">
        <Card.Title>Create a recipe</Card.Title>
        <Form className="recipe-form" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Recipe image:</Form.Label>
            <DragDrop handleUpload={setImagePath} />
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
          <Button id="recipe-form-button" variant="danger" type="submit" block>
            Create recipe
          </Button>
        </Form>
      </Card>
    </>
  );
}
