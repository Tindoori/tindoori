import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import { AuthProvider } from "../Auth";
import PrivateRoute from "../PrivateRoute";
import CreateRecipe from "../CreateRecipe/CreateRecipe";

function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/CreateRecipe" component={CreateRecipe} />
      </Router>
    </AuthProvider>
  );
}

export default App;
