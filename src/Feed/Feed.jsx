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
  const [mealtypes, setMealtypes] = useState([]);
  const [selected, setSelected] = useState({
    allergy: "",
    mealtype: "",
  });

  useEffect(() => {
    let recipesToFilter = [""];

    fs.collection("preference")
      .doc("preference")
      .get()
      .then((docSnapshot) => {
        const allergiesData = docSnapshot.get("allergy");
        setAllergies(allergiesData);

        const mealtypesData = docSnapshot.get("mealtype");
        setMealtypes(mealtypesData);
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

    const query = fs
      .collection("recipe")
      .where("allergy", "!=", selected.allergy);

    // Clear recipes as firebase will filter recipes
    setRecipes([]);

    if (selected.mealtype === "") {
      fetchConsumerData().then(() =>
        query.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Filter liked/disliked recipes
            if (!recipesToFilter.includes(doc.id)) {
              setRecipes((prevState) => [...prevState, doc.data()]);
            }
          });
        })
      );
    } else {
      fetchConsumerData().then(() =>
        query
          .where("mealtype", "==", selected.mealtype)
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
    }
  }, [fs, auth.currentUser.uid, selected]);

  const onPreferencesSelect = (preferenceType, selectedPref) => {
    setSelected((prevState) => ({
      ...prevState,
      [preferenceType]: selectedPref,
    }));
  };

  const Preferences = allergies.map((allergy) => (
    <Dropdown.Item
      id="#preferences-dropdown-item"
      key={allergy}
      as="button"
      onSelect={() => onPreferencesSelect("allergy", allergy)}
    >
      {allergy}
    </Dropdown.Item>
  ));

  const Mealtypes = mealtypes.map((mealtype) => (
    <Dropdown.Item
      id="#preferences-dropdown-item"
      key={mealtype}
      as="button"
      onSelect={() => onPreferencesSelect("mealtype", mealtype)}
    >
      {mealtype}
    </Dropdown.Item>
  ));

  const ClearSelection = (selectionKey) => (
    <Dropdown.Item
      as="button"
      key="clear-allergies"
      onSelect={() =>
        setSelected((prevState) => ({
          ...prevState,
          [selectionKey]: "",
        }))
      }
    >
      Clear selection
    </Dropdown.Item>
  );

  return (
    <div id="feed">
      <div id="preferences">
        <DropdownButton
          id="preferences-dropdown"
          title="Allergies"
          variant="danger"
        >
          {Preferences}
          <Dropdown.Divider />
          {ClearSelection("allergy")}
        </DropdownButton>
        <DropdownButton
          id="preferences-dropdown"
          title="Mealtypes"
          variant="danger"
        >
          {Mealtypes}
          <Dropdown.Divider />
          {ClearSelection("mealtype")}
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
