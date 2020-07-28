import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import PrivateRoute from "../../components/privateRoute";
import { POSTHeader, fetcher } from "../../services/functions";

import useSWR from "swr";

const Recommendations = (props) => {
  const router = useRouter();
  const { cid } = router.query;

  //const [data, setdata] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [waitEval, setWaitEval] = useState(false);
  const [clickedName, setClickedName] = useState();

  // ! currently makes two requests because `cid` is state and changes from undefined to route
  const { data, error } = useSWR(`/api/user/classroom/${cid}/`, fetcher);
  console.log(data, error);

  const Items = (props) => {
    return (
      <div>
        <ul className="searched-items">
          {props.items.map((single) => (
            <a
              className="card card-my-classrooms mx-auto p-4 my-3 maxer-500"
              key={single.name}
              href={single.url}
              target="blank"
              onClick={() => clickedItems(single.name)}
            >
              <div className="row">
                <div className="col">
                  <h4 className="card-title text-primary m-0">{single.name}</h4>
                </div>
              </div>
            </a>
          ))}
        </ul>
      </div>
    );
  };
  const clickedItems = (name) => {
    setWaitEval(true);
    setClickedName(name);
  };

  const postEval = (num) => {
    setWaitEval(false);
    fetch(`/api/user/eval/`, {
      ...POSTHeader(),
      body: JSON.stringify({
        material: clickedName,
        eng: num,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        //getreq();
      });
  };

  const Eval = () => {
    return (
      <div className="">
        <div className="alert alert-success" role="alert">
          <p>Did you like </p>
          <h4 className="alert-heading">{clickedName}</h4>

          <hr />

          <button
            className="btn btn-outline-success m-3 px-5"
            onClick={() => postEval(1)}
          >
            Yes
          </button>
          <button
            className="btn btn-outline-danger m-3 px-5"
            onClick={() => postEval(0)}
          >
            No
          </button>
        </div>
      </div>
    );
  };

  console.log(error);

  return (
    <PrivateRoute>
      <Layout hideFooter={true}>
        <Navbar />
        <div className="container">
          {cid ? <h4 className="mb-5">{cid}</h4> : null}
          {waitEval ? (
            <Eval />
          ) : data ? (
            <Items items={data} />
          ) : error ? (
            <div>
              <div className="text-center text-black">
                You are not in this class
              </div>
              <Link href="/classrooms">
                <a>Join class</a>
              </Link>
            </div>
          ) : (
            <div className="loading-icon mx-auto" />
          )}
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Recommendations;
