import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../src/components/layout";
import Navbar from "../src/components/navbar";
import PrivateRoute from "../src/components/privateRoute";
import useSWR from "swr";

const Main = () => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("/api/user/availableclasses/", fetcher);
  return (
    <PrivateRoute>
      <Layout>
        <Navbar />
        <div className="animated fadeIn text-dark">
          <div className="">
            <div className="text-green mx-auto">
              <h3>Available classrooms</h3>
              <div className="mx-auto mt-4">
                {data
                  ? data.map((classs) => (
                      <Link
                        href="/classroom/[pid]"
                        as={`/classroom/${classs.name}`}
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
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Main;
