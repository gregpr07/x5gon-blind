import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../src/components/layout";
import Navbar from "../src/components/navbar";
import { isLoggedIn, handleLogin } from "../services/auth";
import { POSTHeader } from "../services/functions";

const Login = () => {
  const authTokens = isLoggedIn();

  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  if (authTokens) {
    window.location.href = "/";
  }

  const postLogin = (e) => {
    e.preventDefault();
    fetch(`/api/rest-auth/login/`, {
      ...POSTHeader(),
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((json) => {
        console.log(json);
        handleLogin(userName);
        setIsError(false);
      })
      .catch((rejection) => {
        rejection.json().then((err) => {
          console.log(err);
          setIsError(err.non_field_errors);
        });
      });
  };

  return (
    <>
      <Navbar />
      <Layout>
        {isError ? <div className="alert alert-danger">{isError}</div> : null}
        <form onSubmit={(e) => postLogin(e)} className="maxer-form mx-auto">
          <div className="form-group">
            <input
              className="form-control"
              type="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="username"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Choose a password"
            />
          </div>
          <button type="submit" className="button-green px-5 mb-2">
            Sign In
          </button>
        </form>

        <Link href="/signup">
          <a>Don't have an account?</a>
        </Link>
      </Layout>
    </>
  );
};

export default Login;
