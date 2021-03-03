import React, { useState } from "react";
import firebase from "firebase/app";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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

  return (
    <div className="registration">
      <h1>Create an account</h1>
      <div>
        <form className="registration-form" onSubmit={onSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="displayName" className="block">
            Full Name:
          </label>
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="E.g: Joe"
            id="displayName"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="E.g: joe123@gmail.com"
            id="userEmail"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
}
