import React from "react";
import Card from "../Card/Card";
import SwipeButton from "../SwipeButton/SwipeButton";

export default function Feed() {
  return (
    <div>
      <Card />
      <SwipeButton action="dislike" />
      <SwipeButton action="like" />
    </div>
  );
}
