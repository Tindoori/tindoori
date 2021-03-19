import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Match.css";
import { Button, Modal } from "react-bootstrap";
import RecipeCard from "../RecipeCard/RecipeCard";

export default function Match() {
  const [showModal, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Its a match!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          content
          <RecipeCard />
          <h5>The recipe will be added to your recipe overview!</h5>
        </Modal.Body>
      </Modal>
    </>
  );
}
