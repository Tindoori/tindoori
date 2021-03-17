import React from "react";
import PropTypes from "prop-types";

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
    <button type="submit" onClick={() => onClickHandler()}>
      {action}
    </button>
  );
}

SwipeButton.propTypes = {
  action: PropTypes.string.isRequired,
};
