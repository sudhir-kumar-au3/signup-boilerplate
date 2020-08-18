import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import withAuth from "../components/AuthHOC";
import NoMatch from "../pages/NoMatch";
import ProtectedRoute from "./ProtectedRoute";
function Router() {
  return (
    <Switch>
      <Route component={Login} exact path="/signin" />
      <Route component={Signup} exact path="/register" />
      <ProtectedRoute component={withAuth(Home)} path="/home"></ProtectedRoute>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default withRouter(Router);
