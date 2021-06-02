import React, { useState, useEffect } from "react";
import { Alert, Button, Card, Form, Col } from "react-bootstrap";
import "./CreateRecipe.css";
import firebase from "firebase";
import { Redirect } from "react-router";
import DragDrop from "../DragDrop/DragDrop";
import FormDropdown from "../FormDropdown/FormDropdown";

export default function CreateRecipe() {
  const [imgPathValue, setImgPathValue] = useState("");
  const [error, setError] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [preferences, setPreferences] = useState();
  const [isImgUploaded, setIsImgUploaded] = useState(true);
  const [ingredient, setIngredient] = useState([]);
  const [step, setSteps] = useState([]);

  const fs = firebase.firestore();

  // Get preferences from fs
  useEffect(() => {
    fs.collection("preference")
      .doc("preference")
      .get()
      .then((snapshot) => {
        setPreferences(snapshot.data());
      });
  }, [fs]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (imgPathValue) {
      const {
        recipeName,
        description,
        cookingTime,
        allergy,
        dietary,
        mealtype,
      } = event.target.elements;

      const ref = fs.collection("recipe").doc();
      const userUid = firebase.auth().currentUser.uid;
      ref
        .set({
          id: ref.id,
          imgPath: imgPathValue,
          name: recipeName.value,
          description: description.value,
          cookingTime: cookingTime.value,
          allergy: allergy.value,
          dietary: dietary.value,
          mealtype: mealtype.value,
          ingredients: ingredient,
          steps: step,
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
          <Form.Label>Use a comma to separate the ingredients.</Form.Label>
        </Form.Group>
        <Form.Group controlId="formSteps" id="recipe-form-group">
          <Form.Label>Steps:</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="E.g:&#10;1. step 1&#10;2. step 2&#10;3. step 3&#10;..."
            rows={4}
            onChange={(e) => setSteps(e.target.value.split(","))}
            name="steps"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Dietary information:</Form.Label>
          {preferences &&
            Object.keys(preferences).map((preference, i) => {
              return (
                <Col key={`${preference}-column`}>
                  <Form.Label>
                    {preference.charAt(0).toUpperCase() + preference.slice(1)}
                  </Form.Label>
                  <FormDropdown
                    name={preference}
                    values={Object.values(preferences)[i]}
                  />
                </Col>
              );
            })}
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
