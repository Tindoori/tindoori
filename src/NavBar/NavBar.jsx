import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import firebase from "firebase";
// import { Redirect } from "react-router";
import "./NavBar.css";
import { AuthContext } from "../Auth";

export default function Registration() {
  const { currentUser } = useContext(AuthContext);

  function logout() {
    firebase.auth().signOut();
  }

  return (
    <>
      <Navbar bg="lightdark" expand="md">
        <Navbar.Brand href="/">Tindoori</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="add-recipe">Add Recipe</Nav.Link>
            <Form id="navbar-form">
              <Button
                id="sign-out-button"
                variant="outline-danger"
                onClick={() => logout()}
              >
                Log out
              </Button>
              {/* TODO change link to profile link when component is created */}
              <Navbar.Text>
                Signed in as: <a href="/">{currentUser.email}</a>
              </Navbar.Text>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
