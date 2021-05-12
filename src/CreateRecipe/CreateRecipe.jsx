import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "./CreateRecipe.css";
import firebase from "firebase";
import { Redirect } from "react-router";
import DragDrop from "../DragDrop/DragDrop";

export default function CreateRecipe() {
  const [imgPathValue, setImgPathValue] = useState("");
  const [error, setError] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [lists, setLists] = useState();

  const fs = firebase.firestore();

  useEffect(() => {
    fs.collection("preference")
      .doc("preference")
      .get()
      .then((snapshot) => {
        setLists(snapshot.data());
      });
  }, [fs]);

  const createDropdown = () => {
    if (lists) {
      const keys = Object.keys(lists);
      const values = Object.values(lists);
      return (
        <Form.Group>
          <Form.Label>Dietary information:</Form.Label>
          {keys.map((key, i) => {
            return (
              <DropdownButton id="dropdown-basic-button" title={key}>
                {values[i].map((value) => (
                  <Dropdown.Item href="#/action-1">{value}</Dropdown.Item>
                ))}
              </DropdownButton>
            );
          })}
        </Form.Group>
      );
    }
    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      recipeName,
      description,
      cookingTime,
      ingredients,
      allergy,
      diet,
    } = event.target.elements;

    fs.collection("recipe").doc();
    fs.set({
      id: fs.id,
      imgPath: imgPathValue,
      name: recipeName.value,
      description: description.value,
      cookingTime: cookingTime.value,
      ingredients: ingredients.value,
      allergy: allergy.value,
      diet: diet.value,
    }).catch((e) => setError(e));

    setIsValidated(true);
  };

  if (isValidated === true) {
    return <Redirect to="/" />;
  }

  const onChange = (data) => {
    setImgPathValue(data);
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
        {createDropdown()}
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
