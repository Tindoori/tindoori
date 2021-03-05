import React, { useState } from "react";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Registration.css";

export default function Registration() {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO bootstrap validation instead of validation below?
    if (user.password !== user.confirmPassword) {
      setUser({
        ...user,
        error: "The passwords do not match!",
      });
      // Stop the form from submitting
      return false;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      // eslint-disable-next-line no-unused-vars
      .then((userCredential) => {
        // Set display name for new user
        userCredential.user.updateProfile({
          displayName: user.displayName,
        });

        // Sign user out
        firebase.auth().signOut();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setUser({
          ...user,
          error: errorMessage,
        });
      });
    return true;
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  return (
    <div className="container">
      <div className="card align-items-center" onautocomplete>
        <div className="card-body">
          <h3 className="card-title">Create an account</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group row-cols-1 ">
              <label htmlFor="displayName">
                Full Name:
                <input
                  type="text"
                  className="form-control"
                  name="displayName"
                  placeholder="E.g: Joe"
                  id="displayName"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group row-cols-1 ">
              <label htmlFor="userEmail">
                Email:
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="E.g: joe123@gmail.com"
                  id="userEmail"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group row-cols-1 ">
              <label htmlFor="userPassword" className="block">
                Password:
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Your Password"
                  id="userPassword"
                  onChange={handleChange}
                  required
                  min={6}
                />
                <small id="passwordHelp" className="form-text text-muted">
                  Your password must be 6-20 characters long.
                </small>
              </label>
            </div>
            <div className="form-group row-cols-1 ">
              <label htmlFor="passwordConfirm" className="block">
                Password confirmation:
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  id="userConfirmPassword"
                  onChange={handleChange}
                  required
                  min={6}
                />
              </label>
            </div>
            {user.error && (
              <div className="alert alert-danger row-cols-1 " role="alert">
                {user.error}
              </div>
            )}
            <button type="submit" className="row-cols-1 btn btn-danger">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
