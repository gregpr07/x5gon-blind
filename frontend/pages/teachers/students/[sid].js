import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { TeacherLayout } from "../../../components/layout";
import { TeacherNavbar } from "../../../components/navbar";
import { Bubble, Radar, Line, defaults } from "react-chartjs-2";

import useSWR from "swr";
import { fetcher } from "../../../services/functions";

const SingleStudent = (props) => {
  const router = useRouter();
  const { sid } = router.query;

  const currentUser = sid;
  const [studentInfo, setStudentInfo] = useState(null);
  const [isError, setIsError] = useState(false);

  /*   const { data, error } = useSWR(
    `/api/teacher/present/${currentUser}`,
    fetcher
  ); */

  /*   const studentInfo = data;
  const isError = error; */

  useEffect(() => {
    if (sid) {
      fetch(`/api/teacher/present/${currentUser}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else throw res.status;
        })
        .then((json) => {
          console.log(json);

          setStudentInfo(json);
          console.log(json);
        })
        .catch((status) => (status === 500 ? setIsError(true) : null));
    }
  }, [sid]);

  const SpiderChart = () => {
    const summary = studentInfo.annotated_summary;
    var data = [];
    summary[1].map((item) => {
      data.push(item.value);
    });
    console.log(data);
    return (
      <div className="fadeInDown">
        <Radar
          data={{
            labels: summary[0],
            datasets: [
              {
                label: "",
                data: data,
                backgroundColor: "#009CCC75",
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
            scale: {
              ticks: {
                suggestedMin: 0,
              },
            },
          }}
        />
      </div>
    );
  };

  const GaussianDistro = () => {
    const range = 200;

    const val = 8.3 * 3;
    const dx = (val * 2) / range;
    var xrange = [-val];
    for (let i = 0; i < range; i++) {
      xrange.push(xrange[xrange.length - 1] + dx);
    }
    const normdist = (xarr, mu, sig) => {
      var yarr = [];
      xarr.map((x) => {
        yarr.push(
          (1 / (sig * (2 * 3.14) ** 2)) *
            2.81 ** ((-1 / 2) * (x - mu / sig) ** 2)
        );
      });
      return yarr;
    };

    const summary = studentInfo.annotated_summary;

    console.log(summary);
    const colors = ["#4877FF50", "#17285D45", "#00AD5780"];
    return (
      /* ! display poiting line at 0 */
      <Line
        data={{
          labels: xrange,
          datasets: summary[1].map((el, index) => {
            return {
              label: summary[0][index],
              data: normdist(xrange, el.mu, el.sigma),
              backgroundColor: colors[index],
            };
          }),
          lineAtIndex: 0,
        }}
        options={{
          legend: {
            display: true,
          },
          scales: {
            xAxes: [
              {
                display: false,

                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
            yAxes: [
              {
                display: false,
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        }}
      />
    );
  };

  const StudentVisits = (object) => {
    return (
      <div className="card">
        <ul className="list-group list-group-flush">
          <li
            className={"list-group-item"}
            data-toggle="tooltip"
            data-placement="top"
            title="New to old"
          >
            User visit history
          </li>
          {object.visits.map((visit, index) => (
            <li key={index} className={"list-group-item"}>
              <a
                className={"text-" + (visit.engagement ? "success" : "danger")}
                href={visit.material_id__url}
                target="blank"
                data-toggle="tooltip"
                data-placement="top"
                title={visit.timeOfVisit}
              >
                {visit.material_id__name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <TeacherLayout>
      <TeacherNavbar />

      <div className="maxer-1000 mx-auto pt-128">
        {studentInfo ? (
          <div className="row">
            <h4 className="mx-auto mt-1 mb-4">
              Current student: <b>{studentInfo.user}</b>
            </h4>
            <div className="col-9">
              <SpiderChart />
              <GaussianDistro />
            </div>
            <div className="col">
              <StudentVisits visits={studentInfo.visits} />
            </div>
          </div>
        ) : isError ? (
          <div className="maxer-1000 mx-auto">User doesn't have any data</div>
        ) : (
          <div className="d-flex justify-content-center">
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
};

export default SingleStudent;
