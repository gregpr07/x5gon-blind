import React from "react";
import Link from "next/link";
import { NewLayout } from "../components/layout";
import Navbar from "../components/navbar";
import { isLoggedIn, isTeacher } from "../services/auth";

const Index = (props) => {
  return (
    <NewLayout>
      <div>
        <div className="position-relative overflow-hidden p-3 pt-5 mt-3 mt-md-0 p-md-5 m-md-3 text-center bg-light">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h2 className="display-3 font-weight-normal">
              Pythia blind assistant
            </h2>
            <p className="lead font-weight-normal">
              Recommendation engine, based on scalable, interpretable Bayesian
              Opposition based classifier.
            </p>
            <button className="btn btn-outline-secondary" href="#">
              Coming soon
            </button>
          </div>
          <div className="product-device shadow-sm d-none d-md-block" />
          <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
        </div>
        <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
            <div className="my-3 py-3">
              <h2 className="display-5">Students</h2>
              <p className="lead">Learn</p>
            </div>
            <div
              className="bg-light shadow-sm mx-auto"
              style={{
                width: "80%",
                height: "200px",
                borderRadius: "21px 21px 0 0",
              }}
            >
              <div
                style={{
                  paddingTop: "90px",
                }}
              >
                <Link href={isLoggedIn() ? "/portal" : "/signup"}>
                  <a className="btn btn-outline-secondary" href="#">
                    {isLoggedIn() ? "Student portal" : "Sign up for free"}
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 p-3">
              <h2 className="display-5">Teachers</h2>
              <p className="lead">Manage</p>
            </div>
            <div
              className="bg-dark shadow-sm mx-auto"
              style={{
                width: "80%",
                height: "200px",
                borderRadius: "21px 21px 0 0",
              }}
            >
              <div
                style={{
                  paddingTop: "90px",
                }}
              >
                <Link
                  href={
                    isLoggedIn()
                      ? isTeacher()
                        ? "/teachers"
                        : "/myprofile"
                      : "/signup"
                  }
                >
                  <a className="btn btn-outline-secondary" href="#">
                    {isLoggedIn()
                      ? isTeacher()
                        ? "Teachers portal"
                        : "Upgrade account"
                      : "Sign up for free"}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default Index;
