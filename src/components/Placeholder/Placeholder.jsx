import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "./Placeholder.css";

// Pass on placeholder text
export default function PlaceholderCard({ cardTitle, cardBody }) {
  return (
    <Card id="placeholder-card">
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{cardBody}</Card.Text>
      </Card.Body>
    </Card>
  );
}

PlaceholderCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  cardBody: PropTypes.string.isRequired,
};
