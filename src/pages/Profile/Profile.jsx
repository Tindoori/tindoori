import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function Profile() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [currPass, setCurrPass] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatNewPass, setRepeatNewPass] = useState("");
  const user = firebase.auth().currentUser;

  useEffect(() => {
    setEmail(firebase.auth().currentUser.email);
    setNewEmail(firebase.auth().currentUser.email);
  }, []);

  // Reauthenticate the user before anything dangerous can happen
  const reauthenticate = async () => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currPass
    );

    await user.reauthenticateWithCredential(credential).catch((e) => {
      setMessage(e.message);
      setSuccess(false);
    });
  };

  const changeEmail = () => {
    reauthenticate().then(() => {
      if (email !== newEmail) {
        user.updateEmail(newEmail);
        setSuccess(true);
      }
    });
  };

  const changePass = () => {
    reauthenticate().then(() => {
      if (newPass === repeatNewPass && newPass.length !== 0) {
        user.updatePassword(newPass).catch((e) => {
          setMessage(e.message);
          setSuccess(false);
        });
        setSuccess(true);
      } else if (newPass !== repeatNewPass) {
        setMessage("Passwords don't match up");
        setSuccess(false);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeEmail();
    changePass();
  };

  return (
    <Card id="create-recipe-card">
      <Card.Title>Edit Profile</Card.Title>
      <Card.Body>
        On this page you can change your email and/or your password.
      </Card.Body>
      <Form className="recipe-form" onSubmit={handleSubmit}>
        <Form.Group controlId="email" id="recipe-form-group">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" id="recipe-form-group">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            name="newPass"
            type="password"
            onChange={(e) => setNewPass(e.target.value)}
          />
          <Form.Label>Repeat new Password:</Form.Label>
          <Form.Control
            name="repeatNewPass"
            type="password"
            onChange={(e) => setRepeatNewPass(e.target.value)}
          />
          <Form.Label>Current Password:</Form.Label>
          <Form.Control
            name="currPass"
            type="password"
            onChange={(e) => setCurrPass(e.target.value)}
          />
          <Form.Text className="text-muted">
            Enter your currrent password before submitting the changes.
          </Form.Text>
          {success ? (
            <Alert variant="success" role="alert">
              Information is successfully changed
            </Alert>
          ) : (
            message && (
              <Alert variant="danger" role="alert">
                {message}
              </Alert>
            )
          )}
        </Form.Group>
        <Button id="recipe-form-button" variant="danger" type="submit" block>
          Change info
        </Button>
      </Form>
    </Card>
  );
}
