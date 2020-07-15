import React from "react";
import Router from "next/router";
import { isLoggedIn, isTeacher } from "../services/auth";

export const PrivateRoute = (props) => {
  if (!isLoggedIn()) {
    if (typeof window !== "undefined") {
      Router.push("/login");
    }
    return null;
  }

  return props.children;
};

export const TeacherRoute = (props) => {
  if (isLoggedIn()) {
    if (isTeacher()) {
      return props.children;
    } else {
      if (typeof window !== "undefined") {
        Router.replace("/teachers/401");
      }
      return null;
    }
  } else {
    if (typeof window !== "undefined") {
      Router.push("/login");
    }
    return null;
  }
};

export default PrivateRoute;
