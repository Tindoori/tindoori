import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SwipeButton.css";

export default function SwipeButton({ action }) {
  function onClickHandler() {
    // TODO: Replace with a call to the database
    if (action === "like") {
      console.log("You liked the recipe");
    } else if (action === "dislike") {
      console.log("You disliked the recipe");
    }
  }
  return (
    <Button
      id="swipe-button"
      variant="outline-primary"
      type="submit"
      onClick={() => onClickHandler()}
    >
      {action}
    </Button>
  );
}

SwipeButton.propTypes = {
  action: PropTypes.string.isRequired,
};
