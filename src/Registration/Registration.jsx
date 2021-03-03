import React, { useState } from "react";
import firebase from "firebase/app";

export default function Registration() {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      // eslint-disable-next-line no-unused-vars
      .then((userCredential) => {
        // TODO confirmation email
        firebase.auth().signOut();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  return (
    <div className="registration">
      <h1>Create an account</h1>
      <div>
        <form className="registration-form" onSubmit={handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="displayName" className="block">
            Full Name:
          </label>
          <input
            type="text"
            name="displayName"
            placeholder="E.g: Joe"
            id="displayName"
            onChange={handleChange}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="E.g: joe123@gmail.com"
            id="userEmail"
            onChange={handleChange}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            id="userPassword"
            onChange={handleChange}
          />
          <button type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
}
