import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import Match from "../Match/Match";

export default function Card() {
  const [liked, setLiked] = useState(false);

  const onSwipe = (direction) => {
    // TODO: Replace with a call to the database
    console.log(`you swiped: ${direction}`);
    if (direction === "right") {
      setLiked(true);
    }
  };

  return (
    <>
      <TinderCard onSwipe={onSwipe} preventSwipe={["up", "down"]}>
        Card
      </TinderCard>
      {liked === true && <Match />}
    </>
  );
}
