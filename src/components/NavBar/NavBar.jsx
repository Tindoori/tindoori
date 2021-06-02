import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import firebase from "firebase";
import "./NavBar.css";

export default function NavBar() {
  function logout() {
    firebase.auth().signOut();
  }

  return (
    <>
      <Navbar id="navbar" expand="md">
        <Navbar.Brand href="/">
          <img src="logo.png" width="40" alt="Tindoori logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="add-recipe">Add Recipe</Nav.Link>
            <Nav.Link href="likes">Liked Recipes</Nav.Link>
            <Form id="navbar-form">
              <Button
                id="sign-out-button"
                variant="outline-danger"
                onClick={() => logout()}
              >
                Log out
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
