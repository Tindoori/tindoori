import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Match.css";
import { Modal } from "react-bootstrap";
import RecipeCard from "../RecipeCard/RecipeCard";

export default function Match() {
  const [showModal, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal id="match-modal" show={showModal} onHide={handleClose} size="lg">
        <Modal.Header id="match-modal-header" closeButton>
          <Modal.Title id="match-modal-header-title">Its a match!</Modal.Title>
        </Modal.Header>
        <Modal.Body id="match-modal-body">
          <RecipeCard id="match-modal-recipe-card" />
          <h5 id="match-modal-footer">
            The recipe will be added to your recipe overview!
          </h5>
        </Modal.Body>
      </Modal>
    </>
  );
}
