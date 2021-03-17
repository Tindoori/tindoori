import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

export default function Match() {
  const [showModal, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Its a match!</Modal.Title>
        </Modal.Header>
        <Modal.Body> recipe content</Modal.Body>
      </Modal>
    </>
  );
}
