import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/Overview/Overview.css";
import "./Created.css";
import firebase from "firebase";
import { Form } from "react-bootstrap";
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
      <h4 id="created-recipes-title">My recipes</h4>
      <Form.Text id="helptext-created" muted>
        Here are all recipes you created!
      </Form.Text>
      <Overview recipes={recipes} />
    </>
  );
}
