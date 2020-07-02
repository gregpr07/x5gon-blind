import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { handleLogin, getUserName, logout } from "../../services/auth";
import logo from "../images/logo/x5gon_logo_light.svg";

const Navbar = (router) => {
  const [authTokens, setAuthTokens] = useState(getUserName());
  return (
    <nav className="navbar navbar-expand navbar-dark bg-light fixed-top">
      <div className="navbar-brand">
        <a href="https://platform.x5gon.org" className="nav-link">
          <img src={logo} height="22px" alt="X5GON logo"></img>
        </a>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav mr-auto"></ul>
        <ul className="navbar-nav ml-auto">
          {authTokens ? (
            <>
              <Link href="/portal">
                <li className="nav-item nav-link text-primary">Portal</li>
              </Link>
              <Link href="/myprofile">
                <li className="nav-item nav-link text-primary">
                  My profile ({authTokens})
                </li>
              </Link>
              <a
                href="/"
                onClick={(event) => {
                  //event.preventDefault()
                  logout(() => navigate(`/`));
                }}
              >
                <li className="nav-item nav-link text-primary">Logout</li>
              </a>
            </>
          ) : (
            <>
              <Link href="/login">
                <li className="nav-item nav-link text-primary">Login</li>
              </Link>
              <Link href="/signup">
                <li className="nav-item nav-link text-primary">Sign up</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
