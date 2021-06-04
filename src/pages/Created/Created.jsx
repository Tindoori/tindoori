import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/Overview/Overview.css";
import firebase from "firebase";
import Overview from "../../components/Overview/Overview";

export default function Created() {
  const fs = firebase.firestore();
  const auth = firebase.auth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fs.collection("recipe")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // Filter created recipes
          if (doc.data().createdBy === auth.currentUser.uid) {
            setRecipes((prevState) => [...prevState, doc.data()]);
          }
        });
      });
  }, [fs, auth.currentUser.uid]);

  return (
    <>
      <Overview recipes={recipes} />
    </>
  );
}
