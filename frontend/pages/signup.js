import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { POSTHeader } from "../services/functions";
import { isLoggedIn } from "../services/auth";

const Signup = (props) => {
  if (isLoggedIn()) {
    Router.push("/");
  }

  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState(0);
  const [password, setPassword] = useState("");
  const [teacher, setTeacher] = useState(false);

  const [isError, setIsError] = useState(false);
  const [successfully, setSucessfully] = useState(false);

  const postRegister = (e) => {
    e.preventDefault();
    console.log(userType);
    fetch(`/api/user/register/`, {
      ...POSTHeader(),
      body: JSON.stringify({
        name: userName,
        password: password,
        userType: userType,
        teacher: teacher,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === "error") {
          setIsError(true);
          setSucessfully(false);
        } else {
          setIsError(false);
          setSucessfully(true);
        }
      });
  };
  return (
    <Layout>
      <Navbar />
      <h4 className="mb-5">Sign up</h4>

      {isError ? (
        <div className="alert alert-danger">User already exists</div>
      ) : null}
      {successfully ? (
        <div className="alert alert-success">
          Created user {userName} successfully{" "}
          <Link href="/login">You can now log in</Link>
        </div>
      ) : null}
      <form onSubmit={postRegister} className="maxer-form mx-auto">
        <div className="form-group">
          <input
            className="form-control"
            type="username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="Choose a username"
            required
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
            required
          />
          <label htmlFor="exampleFormControlSelect1" className="mt-3">
            Choose what you are
          </label>
          <select
            className="form-control"
            required
            id="exampleFormControlSelect1"
            value={userType}
            onChange={(event) => setUserType(event.target.value)}
          >
            <option value="0">Blind student</option>
            <option value="1">Partially blind student</option>
          </select>
        </div>
        <div className="form-check my-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={teacher}
            id="defaultCheck1"
            onChange={(e) => {
              setTeacher(e.target.checked);
              console.log(e.target.checked);
            }}
          />
          <label className="form-check-label" htmlFor="defaultCheck1">
            I am a teacher
          </label>
        </div>
        <button type="submit" className="button-green px-5 mb-2">
          Sign Up
        </button>
      </form>
      <Link href="/login">Already have an account?</Link>
    </Layout>
  );
};

export default Signup;
