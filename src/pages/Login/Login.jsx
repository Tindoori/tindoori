import React, { useCallback, useContext, useState } from "react";
import { Redirect } from "react-router";
import firebase from "firebase/app";
import PropTypes from "prop-types";
import { Button, Alert, Form, Card } from "react-bootstrap";
import { AuthContext } from "../../utils/Auth";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ history }) => {
  const [error, setError] = useState("");

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();

      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (e) {
        setError(e);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Card id="registration-card">
      <div id="feed">
        <img src="logo.png" alt="Cannot load " />
        <h1>Tindoori</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group id="registration-form-group">
            <Form.Label>
              Email
              <Form.Control
                type="email"
                id="email"
                placeholder="Enter email"
                name="email"
              />
            </Form.Label>
          </Form.Group>
          <Form.Group id="registration-form-group">
            <Form.Label>
              Password
              <Form.Control
                type="password"
                id="password"
                placeholder="Password"
                name="password"
              />
            </Form.Label>
          </Form.Group>
          {error && (
            <Alert variant="danger" role="alert">
              {error.message}
            </Alert>
          )}
          <div id="#registration-form-button ">
            <Button type="submit" variant="danger">
              Login
            </Button>
          </div>
        </Form>
        <br />
        <div>
          <a href="/registration">Sign up</a>
        </div>
      </div>
    </Card>
  );
};

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Login;
