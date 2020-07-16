import React from "react";
import Link from "next/link";
import Head from "next/head";
import logo from "../src/images/logo/x5gon_logo_light.svg";
import { TeacherRoute } from "./privateRoute";

const Header = () => {
  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Serif:200,300,400,700&display=swap"
        rel="stylesheet"
      />
      <title>X5GON blind</title>
    </Head>
  );
};

const Layout = (props) => {
  return (
    <>
      <Header />
      <div className="full-screen text-center text-white">
        <div className="mb-5 mb-md-0" />
        <div className="full-screen bg-dark p-128">{props.children}</div>
        <Footer />
      </div>
    </>
  );
};

export const Footer = (props) => (
  <footer className={"pt-4 my-md-5 pt-md-5 text-dark px-3"}>
    <div className="row">
      <div className="col-12 col-md">
        <a href="https://platform.x5gon.org" className="nav-link">
          <img src={logo} height="22px" alt="X5GON logo"></img>
        </a>
        <small className="d-block mb-3 text-muted"></small>
      </div>
      <div className="col-6 col-md">
        <h5>Site links</h5>
        <ul className="list-unstyled text-small">
          <li>
            <a className="text-muted" href="/">
              Home
            </a>
          </li>
          <li>
            <Link href="/portal">
              <a className="text-muted">Students</a>
            </Link>
          </li>
          <li>
            <Link href="/teachers">
              <a className="text-muted">Teachers</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-6 col-md">
        <h5>Resources</h5>
        <ul className="list-unstyled text-small">
          <li>
            <Link href="/static/non_profesional_background.pdf">
              <a className="text-muted">Teacher guide</a>
            </Link>
          </li>
          <li>
            <Link href="/static/technical_background.pdf">
              <a className="text-muted">Technical documentation</a>
            </Link>
          </li>{" "}
        </ul>
      </div>
      <div className="col-6 col-md"></div>
    </div>
  </footer>
);

export const TeacherLayout = (props) => {
  return (
    <TeacherRoute>
      <div>
        <Header />
        {props.children}
      </div>
      <Footer theme="dark" />
    </TeacherRoute>
  );
};

export default Layout;