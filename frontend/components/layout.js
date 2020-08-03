import React from "react";
import Link from "next/link";
import Head from "next/head";
import logo from "../src/images/logo/x5gon_logo_light.svg";
import { TeacherRoute } from "./privateRoute";
import Navbar from "./navbar";

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
      <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
        crossOrigin="anonymous"
      ></script>

      <title>X5GON blind</title>
    </Head>
  );
};

const oldLayout = (props) => {
  return (
    <>
      <Header />
      <div className="full-screen text-center text-white">
        <div className="mb-5 mb-md-0" />
        <div className="full-screen p-128 text-dark">{props.children}</div>
        {props.hideFooter ? null : <Footer />}
      </div>
    </>
  );
};

export const Layout = (props) => {
  return (
    <>
      {props.hideHeader ? null : <Header />}

      <div
        className={
          "text-center " +
          (props.hideTopMargin ? "pt-md-5 mt-4" : "p-128 mt-5 mt-md-0")
        }
      >
        {props.children}
      </div>

      {props.hideFooter ? null : <Footer />}
    </>
  );
};

export const Footer = (props) => (
  <footer className="container py-5">
    <div className="row pt-3 ml-2 ml-md-0">
      <div className="col-12 col-md">
        <a href="https://platform.x5gon.org">
          <img src={logo} height="22px" alt="X5GON logo"></img>
        </a>
      </div>
      <div className="col-12 col-sm text-dark pt-4 pt-md-0">
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
      <div className="col-12 col-sm text-dark">
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
      <div className="col-12 col-sm text-dark">
        <h5>About</h5>
        <ul className="list-unstyled text-small">
          <li>
            <a href="https://platform.x5gon.org/team" className="text-muted">
              Team
            </a>
          </li>
          <li>
            <a
              href="https://platform.x5gon.org/#products"
              className="text-muted"
            >
              Other products
            </a>
          </li>
          <li>
            <a
              href="https://platform.x5gon.org/transparency"
              className="text-muted"
            >
              Transparency
            </a>
          </li>
        </ul>
      </div>
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
