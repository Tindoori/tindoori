import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Card, Form, Button } from "react-bootstrap";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatNewPass, setRepeatNewPass] = useState("");
  const user = firebase.auth().currentUser;

  useEffect(() => {
    setEmail(firebase.auth().currentUser.email);
  }, []);

  const changeEmail = () => {
    user.updateEmail(email);
  };

  const changePass = () => {
    if (newPass === repeatNewPass) {
      user.updatePassword(newPass).catch((error) => console.log(error));
    }
  };

  const onClickHandler = () => {
    changeEmail();
    changePass();
  };

  return (
    <Card id="create-recipe-card">
      <Card.Title>Profile</Card.Title>
      <Form className="recipe-form" onSubmit={null}>
        <Form.Group controlId="email" id="recipe-form-group">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" id="recipe-form-group">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setNewPass(e.target.value)}
          />
          <Form.Label>Repeat new Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setRepeatNewPass(e.target.value)}
          />
        </Form.Group>
        <Button
          id="recipe-form-button"
          variant="danger"
          type="submit"
          onClick={() => onClickHandler()}
          block
        >
          Change info
        </Button>
      </Form>
    </Card>
  );
}
