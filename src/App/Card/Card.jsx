import React from "react";
import firebase from "firebase/app";
import "firebase/storage";

export default function Card() {
  const ref = firebase.storage().ref("/meals/Burger.png");
  const url = ref.getDownloadURL();

  const style = {
    backgroundColor: "#FFFFFF",
    border: "2px solid #F0F0F0",
    borderRadius: "3px",
    width: "644px",
    height: "438px",
  };

  return (
    <div style={style} className="card">
      <img src={{ uri: url }} alt="recipe" />
      <h1 className="dish-title">Dish name</h1>
      <p className="dish-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
        cong...
      </p>
      <p className="dish-cook-time">15 min</p>
    </div>
  );
}
