import React, { useState } from "react";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Registration.css";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

export default function Registration() {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });
  const [createdState, setCreatedState] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO bootstrap validation instead of validation below?
    if (user.password !== user.confirmPassword) {
      setUser({
        ...user,
        error: "The passwords do not match!",
      });
      // Stop the form from submitting
      return false;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Set display name for new user
        userCredential.user.updateProfile({
          displayName: user.displayName,
        });

        // Provide consumer role
        firebase
          .firestore()
          .collection("consumer")
          .doc(userCredential.user.uid)
          .set({ role: 1 });

        // Prepare user recipes collection
        firebase
          .firestore()
          .collection("consumer")
          .doc(userCredential.user.uid)
          .collection("recipes")
          .doc("recipes")
          .set({});

        setCreatedState(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setUser({
          ...user,
          error: errorMessage,
        });
        setCreatedState(false);
      });
    return true;
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
    });
    setCreatedState(false);
  };

  return (
    <Container fluid="md">
      <Card>
        <Card.Title>Create an account</Card.Title>
        <Form className="registration-form" onSubmit={handleSubmit}>
          <Form.Group controlId="formDisplayName">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.g: Joe Johnson"
              onChange={handleChange}
              name="displayName"
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="E.g: joe123@gmail.com"
              className="email"
              onChange={handleChange}
              name="email"
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Password"
              className="password"
              onChange={handleChange}
              name="password"
              required
              min={6}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be at least 6 characters long and must not
              contain spaces or emoji.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Password confirmation:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              name="confirmPassword"
              required
              min={6}
            />
          </Form.Group>
          {user.error && <Alert variant="danger">{user.error}</Alert>}
          {createdState && (
            <Alert variant="info">You have created an account!</Alert>
          )}
          <Button variant="danger" type="submit" block>
            Create account
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
