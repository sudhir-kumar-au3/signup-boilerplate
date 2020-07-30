import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";

function Router() {
  return (
    <Switch>
      <Route component={Login} exact path="/signin" />
      <Route component={Signup} exact path="/register" />
    </Switch>
  );
}

export default withRouter(Router);
