import React, { useState } from "react";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  return (
    <div className="registration">
      <h1>Create an account</h1>
      <div>
        <form className="registration-form">
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
          <button type="button">Create account</button>
        </form>
      </div>
    </div>
  );
}
