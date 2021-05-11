import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  // Check if user is still logged in on every page load.
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  // If the state of the currentUser isn't verified yet,
  // we return a loading spinner.
  return pending ? (
    <Spinner animation="border" variant="danger" />
  ) : (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.func.isRequired,
};
