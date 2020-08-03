import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import PrivateRoute from "../../components/privateRoute";
import useSWR from "swr";
import { fetcher } from "../../services/functions";

const Main = () => {
  const { data, error } = useSWR("/api/user/availableclasses/", fetcher);
  const link = "/classrooms";
  return (
    <PrivateRoute>
      <Layout>
        <Navbar />
        <div
          className="animated fadeIn text-dark container
        "
        >
          <div className="">
            <div className="text-green mx-auto">
              <h3>Classrooms</h3>
              <div className="mx-auto mt-4">
                {data
                  ? data.map((classs) => (
                      <Link
                        href={`${link}/[pid]`}
                        as={`${link}/${classs.name}`}
                      >
                        <a
                          className="card card-my-classrooms mx-auto p-3 my-3 maxer-500"
                          key={classs.name}
                        >
                          <div className="row">
                            <div className="col">
                              <h4 className="card-title text-dark">
                                {classs.name}
                              </h4>
                              <h6 className="card-subtitle text-muted">
                                Created by: {classs.creator}
                              </h6>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))
                  : "loading"}
              </div>
            </div>

            <div className="mt-5 text-white">
              <Link href="/classrooms">
                <a className="btn btn-outline-success px-3">
                  Join new classroom
                </a>
              </Link>{" "}
            </div>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Main;
