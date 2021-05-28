import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import Login from "../Login/Login";
import Home from "../Home/Home";
import { AuthProvider } from "../Auth";
import CreateRecipe from "../CreateRecipe/CreateRecipe";
import Registration from "../Registration/Registration";
import Navbar from "../NavBar/NavBar";
import Likes from "../Overview/Likes";
import PrivateRoute from "../PrivateRoute";
import Created from "../Overview/Created";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Registration} />
          <>
            <Navbar />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/add-recipe" component={CreateRecipe} />
            <PrivateRoute exact path="/likes" component={Likes} />
            <PrivateRoute exact path="/Created" component={Created} />
          </>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
