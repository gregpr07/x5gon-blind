import React from "react";
import Router from "next/router";
import { isLoggedIn } from "../../services/auth";

const PrivateRoute = (props) => {
  if (!isLoggedIn()) {
    if (typeof window !== "undefined") {
      Router.push("/login");
    }
    return null;
  }

  return props.children;
};

export default PrivateRoute;
