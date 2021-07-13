import React from "react";
import { Route, Redirect } from "react-router";

const ProtectedRoute = ({ component, ...res }) => {
  if (localStorage.getItem("token")) {
    return <Route component={component} {...res} />;
  } else {
    return <Redirect to="/LogIn" />;
  }
};

export default ProtectedRoute;
