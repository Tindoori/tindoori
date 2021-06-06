import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Card, Form, Button } from "react-bootstrap";

export default function Profile() {
  const [email, setEmail] = useState();
  // const fs = firebase.firestore();
  // const auth = firebase.auth();
  const currUser = firebase.auth().currentUser;
  // const currEmail = firebase.auth().currentUser.email;

  useEffect(() => {
    setEmail(firebase.auth().currentUser.email);
  }, []);

  const fetchConsumerData = () => {
    // console.log(currUser.email);
  };

  const changeEmail = () => {
    currUser.updateEmail(email);
  };

  fetchConsumerData();
  return (
    <Card id="create-recipe-card">
      <Card.Title>Profile</Card.Title>
      <Form className="recipe-form" onSubmit={null}>
        <Form.Group controlId="formName" id="recipe-form-group">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label>Old Password:</Form.Label>
          <Form.Control
            type="text"
            placeholder="E.g: pasta pesto"
            name="oldPass"
            required
          />
        </Form.Group>
        <Form.Label>New Password:</Form.Label>
        <Form.Control
          type="text"
          placeholder="E.g: pasta pesto"
          name="newPass"
          required
        />
        <Form.Label>Repeat new Password:</Form.Label>
        <Form.Control
          type="text"
          placeholder="E.g: pasta pesto"
          name="newPassRepeat"
          required
        />
        <Button
          id="recipe-form-button"
          variant="danger"
          type="submit"
          onClick={changeEmail}
          block
        >
          Change password
        </Button>
        <Button id="recipe-form-button" variant="danger" type="submit" block>
          Create recipe
        </Button>
      </Form>
    </Card>
  );
}
