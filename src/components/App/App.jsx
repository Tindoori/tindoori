import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import { AuthProvider } from "../../utils/Auth";
import CreateRecipe from "../../pages/CreateRecipe/CreateRecipe";
import Registration from "../../pages/Registration/Registration";
import Navbar from "../NavBar/NavBar";
import Likes from "../../pages/Likes/Likes";
import PrivateRoute from "../../utils/PrivateRoute";

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
          </>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
