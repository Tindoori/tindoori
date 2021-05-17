import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { DropdownButton, Dropdown } from "react-bootstrap";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./Feed.css";

export default function Feed() {
  const fs = firebase.firestore();
  const auth = firebase.auth();
  const [recipes, setRecipes] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    let recipesToFilter = [""];

    fs.collection("preference")
      .doc("preference")
      .get()
      .then((docSnapshot) => {
        const allergiesData = docSnapshot.get("allergy");
        setAllergies(allergiesData);
      });

    async function fetchConsumerData() {
      await fs
        .collection("consumer")
        .doc(auth.currentUser.uid)
        .collection("recipes")
        .doc("recipes")
        .get()
        .then((snapshot) => {
          const consumerRecipeData = Object.values(snapshot.data());

          for (let i = 0; i < consumerRecipeData.length; i += 1) {
            recipesToFilter = recipesToFilter.concat(consumerRecipeData[i]);
          }
        });
    }

    fetchConsumerData().then(() =>
      fs
        .collection("recipe")
        .where("allergies", "!=", selected)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Filter liked/disliked recipes
            if (!recipesToFilter.includes(doc.id)) {
              setRecipes((prevState) => [...prevState, doc.data()]);
            }
          });
        })
    );
  }, [fs, auth.currentUser.uid, selected]);

  const onPreferencesSelect = (selectedAllergy) => {
    setSelected(selectedAllergy);
  };
  const Preferences = allergies.map((allergy) => (
    <Dropdown.Item
      id="preferences-allergies-dropdown-item"
      key={allergy}
      as="button"
      onSelect={() => onPreferencesSelect(allergy)}
    >
      {allergy}
    </Dropdown.Item>
  ));

  return (
    <div id="feed">
      <div id="preferences-allergies">
        <DropdownButton
          id="preferences-allergies-dropdown"
          title="Allergies"
          variant="danger"
        >
          {Preferences}
        </DropdownButton>
      </div>
      <div id="card-container">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
}
