import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import PrivateRoute from "../../components/privateRoute";
import useSWR from "swr";
import { fetcher } from "../../services/functions";
import { POSTHeader } from "../../services/functions";
import { isTeacher } from "../../services/auth";

const Main = () => {
  const { data, error } = useSWR("/api/user/allclasses/", fetcher);
  const link = "/classrooms";
  const handleJoin = (name) => {
    fetch(`/api/user/joinclassroom/`, {
      ...POSTHeader(),
      body: JSON.stringify({
        class: name,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <PrivateRoute>
      <Layout>
        <Navbar />
        <div className="animated fadeIn text-dark">
          <div className="mx-auto">
            <h3 className="text-green">All classrooms</h3>
            <div className="mx-auto pt-5 container">
              <div className="mx-auto maxer-625">
                {data
                  ? data.map((classs) => (
                      <div class="card text-center mb-5" key={classs.name}>
                        <div class="card-body">
                          <h5 class="card-title">
                            <Link
                              href="/classrooms/[cid]"
                              as={`/classrooms/${classs.name}`}
                            >
                              <a>{classs.name}</a>
                            </Link>
                          </h5>
                          <p class="card-text">{classs.description}</p>

                          {classs.is_joined ? (
                            <p>You are already in this class</p>
                          ) : (
                            <button
                              onClick={() => handleJoin(classs.name)}
                              class="btn btn-outline-success px-3"
                            >
                              Join classroom
                            </button>
                          )}
                        </div>
                        <div class="card-footer text-muted">
                          <div className="row">
                            <div className="col-12 col-sm-4">
                              Created by: {classs.creator}
                            </div>
                            <div className="col-12 col-sm-4">
                              Materials: {classs.materials}
                            </div>{" "}
                            <div className="col-12 col-sm-4">
                              Students: {classs.students}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : "loading"}
              </div>
            </div>
            {isTeacher() ? (
              <Link href="/teachers/classrooms/create">
                <a className="btn btn-outline-secondary px-3">
                  Create new classroom
                </a>
              </Link>
            ) : null}
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Main;
