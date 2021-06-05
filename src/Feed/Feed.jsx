import React, { useEffect, useState } from "react";
import firebase from "firebase";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./Feed.css";
import Preferences from "../Preferences/Preferences";

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

  const onClearPreference = (data) => {
    setSelected((prevState) => ({
      ...prevState,
      [data]: "",
    }));
  };

  return (
    <div id="feed">
      <div id="preferences">
        <Preferences
          preferenceType="allergy"
          preferenceData={allergies}
          onPreferencesSelect={(type, selectedItem) => {
            onPreferencesSelect(type.valueOf(), selectedItem.valueOf());
          }}
          onClearPreference={(e) => {
            onClearPreference(e.valueOf());
          }}
        />
        <Preferences
          preferenceType="mealtype"
          preferenceData={mealtypes}
          onPreferencesSelect={(type, selectedItem) => {
            onPreferencesSelect(type.valueOf(), selectedItem.valueOf());
          }}
          onClearPreference={(e) => {
            onClearPreference(e.valueOf());
          }}
        />
      </div>
      <div id="card-container">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
}
