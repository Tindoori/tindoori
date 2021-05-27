import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import Login from "../Login/Login";
import Home from "../Home/Home";
import { AuthProvider } from "../Auth";
import CreateRecipe from "../CreateRecipe/CreateRecipe";
import RecipeDetail from "../RecipeOverview/RecipeDetail";
import Registration from "../Registration/Registration";
import Navbar from "../NavBar/NavBar";
import Likes from "../Likes/Likes";
import PrivateRoute from "../PrivateRoute";

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
            <PrivateRoute
              exact
              path="/recipedetail/:id"
              component={RecipeDetail}
            />
            <PrivateRoute exact path="/likes" component={Likes} />
          </>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
