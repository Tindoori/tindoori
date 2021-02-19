import React from "react";
import TinderCard from "react-tinder-card";

export default function Card() {
  const onSwipe = (direction) => {
    console.log(`you swiped: ${direction}`);
  };

  return (
    <TinderCard onSwipe={onSwipe} preventSwipe={["up", "down"]}>
      Card
    </TinderCard>
  );
}
