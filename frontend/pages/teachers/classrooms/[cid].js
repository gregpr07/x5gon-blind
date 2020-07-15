import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";

import { TeacherLayout } from "../../../components/layout";
import { TeacherNavbar } from "../../../components/navbar";
import { Bubble, Radar, Line, defaults } from "react-chartjs-2";

import useSWR from "swr";
import { fetcher } from "../../../services/functions";

const Classroom = (props) => {
  const router = useRouter();
  const { cid } = router.query;
  const title = cid;

  /*   const [materials, setMaterials] = useState([]);
  useEffect(() => {
    fetch(`/api/teacher/classroom/${title}/`)
      .then((res) => res.json())
      .then((json) => setMaterials(json.materials));
  }, []); */

  const { data, error } = useSWR(`/api/user/classroom/${cid}/`, fetcher);
  const materials = data;

  const Materials = (mats) => {
    console.log(mats);
    return (
      <div>
        <h5>Materials</h5>
        <ul className="list-group maxer-500">
          {mats.map((mat) => (
            <li className="list-group-item" key={mat.name}>
              {mat.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const AllStudents = (props) => {
    const [studentSet, setStudents] = useState([]);

    const [isError, setIsError] = useState(false);
    const classtitle = props.title;

    // to only render once

    useEffect(() => {
      if (classtitle) {
        fetch(`/api/teacher/players/${classtitle}/`)
          .then((res) => res.json())
          .then((json) => {
            setStudents(json);
            console.log(json);
          })
          .catch((err) => {
            console.log(err);
            setIsError(true);
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Chart = () => {
      return (
        <Bubble
          data={{
            datasets: studentSet,
          }}
          options={{
            onClick: function (evt, item) {
              try {
                console.log("legend onClick", item);
                const datasetIndex = item[0]._datasetIndex;
                const index = item[0]._index;
                const user = studentSet[datasetIndex].data[index].user;
                Router.push(`/teachers/students/${user}`);
                console.log("redirect");
              } catch {
                console.log("Change filter");
              }
            },
            tooltips: {
              callbacks: {
                label: (tooltipItem, data) => {
                  // data for manipulation
                  return data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ].user;
                },
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    display: false,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    display: false,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      );
    };
    const ListAll = () => {
      return (
        <div className="row bg-light p-md-5 p-2 mt-5">
          {studentSet.map((set, index) => (
            <div className="col" key={index}>
              {set.label}
              <ul className="list-group my-3">
                {set.data.map((person, indexx) => (
                  <li className="list-group-item" key={indexx}>
                    <Link href={"/students/" + person.user}>
                      <a>{person.user}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className="maxer mx-auto py-4 px-5">
        {/* {redirectTo ? <Redirect to={`/students/${redirectTo}`} /> : null} */}
        {isError ? (
          <div className="alert alert-warning">
            Visualation need at least two students with data
          </div>
        ) : null}

        <Chart />
        <ListAll />
      </div>
    );
  };

  return (
    <TeacherLayout>
      <TeacherNavbar />
      <div className="maxer mx-auto px-md-5 text-dark pt-128">
        <h4 className="py-3">Classroom: {title}</h4>
        <AllStudents title={title} />
        {materials ? (
          <div className="p-64 px-4">{Materials(materials)}</div>
        ) : null}

        <div className="mt-4">
          <p>Danger zone</p>
          <Link href={"/teachers/classrooms/edit/" + title}>
            <a className="btn btn-warning mr-3">Edit class details</a>
          </Link>
          <button className="btn btn-danger">Delete classroom</button>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Classroom;
