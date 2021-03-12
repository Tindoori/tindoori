import React, { useCallback, useContext, useState } from "react";
import { Redirect } from "react-router"; // eslint-disable-line import/no-extraneous-dependencies
import firebase from "firebase/app";
import PropTypes from "prop-types";
import { AuthContext } from "../Auth";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ history }) => {
  const [error, setError] = useState("");

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();

      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (e) {
        setError(e);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="col-md-auto">
      <h1>Tindoori</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
            />
          </label>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.message}
          </div>
        )}
        <div>
          <button type="submit" className="btn btn-danger">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
