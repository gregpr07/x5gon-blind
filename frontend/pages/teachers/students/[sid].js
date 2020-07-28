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
  const Accordion = (props) => {
    return (
      <div id="accordion">
        <div className="bg-none" id="headingOne">
          <h5 className="mb-0">
            <button
              className="btn btn-outline-info"
              data-toggle="collapse"
              data-target={"#collapseOn" + props.info.id}
              aria-expanded="true"
              aria-controls={"collapseOn" + props.info.id}
            >
              {props.info.title}
            </button>
          </h5>
        </div>
        <div
          id={"collapseOn" + props.info.id}
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="">{props.children}</div>
        </div>
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

              <Accordion info={{ title: "Interpret spider chart", id: "one" }}>
                <p className="py-2">
                  This plots highlights most informative feature values (in
                  average) that contribute to <i>positive</i> usability of a
                  certain material for each of the three categories.
                </p>
              </Accordion>

              <GaussianDistro />

              <Accordion
                info={{ title: "Interpret gaussian chart", id: "two" }}
              >
                <p className="py-2">
                  How do I interpret Gaussians? Simply - they give you much more
                  information than a number. Standard algorithms give their
                  estimate for parameter. We give you a range where we believe
                  the parameter to be. And of course, our range changes the more
                  information about the learner we get.
                </p>
                <p>
                  The more we know about the preferences of the user, the
                  tighter our range estimate becomes. How can you see that on
                  the graph? Just check the 'width' of the hill.{" "}
                  <i>
                    The wider the hill the more uncertain about the parameter
                    estimate we are
                  </i>
                  . The narrower the hill the more certain we are - if the hill
                  deforms into a single line than we are absolutely certain in
                  our estimate. But we will need a lot of data before we are
                  that certain. Also we don't stay that certain till the end of
                  time - over time we slowly loose certainty - our hills become
                  wider. On the image, we can see that we care much more certain
                  into blue parameter than into orange one. Again the only thing
                  that communicates certainty is is the shape.
                </p>
                <img src="/static/two_gauss.png" alt="my image" />
                <p>
                  Can you guess which parameter we can estimate with more
                  certainty?
                </p>
              </Accordion>
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
