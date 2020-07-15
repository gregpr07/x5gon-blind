import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../src/components/layout";
import Navbar from "../../src/components/navbar";
import PrivateRoute from "../../src/components/privateRoute";
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
            <div key={single.name} className="maxer-540 mx-auto my-3">
              <div className="card">
                <div className="card-body bg-light">
                  <a
                    href={single.url}
                    target="blank"
                    onClick={() => clickedItems(single.name)}
                  >
                    <h4>{single.name}</h4>
                  </a>
                </div>
              </div>
            </div>
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
      <div className="position-fixed z-2000 full-width">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Did you like {clickedName}</h4>

          <hr />

          <button
            className="btn btn-success m-3 px-5"
            onClick={() => postEval(1)}
          >
            Yes
          </button>
          <button
            className="btn btn-danger m-3 px-5"
            onClick={() => postEval(0)}
          >
            No
          </button>
        </div>
      </div>
    );
  };

  return (
    <PrivateRoute>
      <Layout>
        <Navbar />
        {cid ? <h4 className="mb-5">{cid}</h4> : null}
        {waitEval ? (
          <Eval />
        ) : data ? (
          <Items items={data} />
        ) : error ? (
          <div>
            <div className="text-center text-black">
              It appears you are logged out
            </div>
          </div>
        ) : (
          <div className="loading-icon mx-auto" />
        )}
      </Layout>
    </PrivateRoute>
  );
};

export default Recommendations;
