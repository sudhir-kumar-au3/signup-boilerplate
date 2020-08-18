import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
function authGuard(WrappedComponent) {
  return class HOC extends Component {
    render() {
      const { history } = this.props;
      const isAuthenticated = JSON.parse(localStorage.getItem("authUser"));
      if (window.location.pathname === "/") {
        if (!window.location.hostname.includes("localhost")) {
          history.push("/signin");
          return null;
        }
        if (isAuthenticated) {
          history.push("/home");
        }
        if (isAuthenticated && window.location.pathname === "/signin") {
          return (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: this.props.location },
              }}
            ></Redirect>
          );
        }
      }

      if (!isAuthenticated && window.location.pathname !== "/") {
        history.push("/signin");
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default (WrappedComponent) => withRouter(authGuard(WrappedComponent));
