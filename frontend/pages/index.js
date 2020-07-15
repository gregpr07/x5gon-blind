import React from "react";
import Link from "next/link";
import Layout from "../src/components/layout";
import Navbar from "../src/components/navbar";

const About = (props) => {
  return (
    <Layout>
      <Navbar />

      <div className="px-3 my-5 pb-md-4 p-128 mx-auto text-center pt-md-0 pt-5">
        <h3 className="display-5 pb-3 animated fadeIn">
          Pythia learning assistant
        </h3>
        <p className="lead maxer-800 mx-auto">
          Recommendation engine, based on scalable, interpretable Bayesian
          Opposition based classifier.
        </p>
      </div>

      <div className="maxer-800 mx-auto px-4 px-lg-0">
        <div className="card-deck mb-3 text-center">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal text-dark">Students</h4>
            </div>
            <div className="card-body text-muted">
              <h3 className="card-title pricing-card-title">Learn</h3>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Feature</li>
                <li>Feature</li>
                <li>Feature</li>
                <li>Feature</li>
              </ul>
              <p className="m-0">
                <Link href="/signup">
                  <a>Sign up for free</a>
                </Link>
              </p>
              <p className="mt-0 mb-2">or visit</p>
              <Link href="/portal">
                <a className="button-green px-5">Student portal</a>
              </Link>
            </div>
          </div>

          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal text-dark">Teachers</h4>
            </div>
            <div className="card-body text-muted">
              <h3 className="card-title pricing-card-title">Manage</h3>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Feature</li>
                <li>Feature</li>
                <li>Feature</li>
                <li>Feature</li>
              </ul>
              <p className="m-0">
                <Link href="/signup">
                  <a>Sign up for free</a>
                </Link>
              </p>
              <p className="mt-0 mb-2">or visit</p>
              <Link href="/teachers">
                <a className="button-green px-5">Teacher portal</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
