import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TeacherLayout } from "../../../components/layout";
import { TeacherNavbar } from "../../../components/navbar";

const Classrooms = () => {
  const [detclassrooms, setDetclassrooms] = useState([]);
  useEffect(() => {
    console.log(detclassrooms);
    fetch(`/api/teacher/myclassrooms/`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setDetclassrooms(json);
      });
  }, []);

  return (
    <TeacherLayout>
      <TeacherNavbar />
      <div className="maxer mx-auto px-5 pt-128">
        <h3>My classrooms</h3>

        <div className="mt-4">
          {detclassrooms.map((classs) => (
            <Link href={"/teachers/classrooms/" + classs.name}>
              <a
                className="card card-my-classrooms p-3 my-3 maxer-500"
                key={classs.name}
                onClick={() => setSelectedClassroom(classs.name)}
              >
                <div className="row">
                  <div className="col">
                    <h4 className="card-title text-dark">{classs.name}</h4>
                    <h6 className="card-subtitle text-muted">Created by you</h6>
                  </div>
                  <div className="col">
                    <p className="text-muted p-0 m-0">
                      Materials: {classs.materials}
                    </p>
                    <p className="text-muted p-0 m-0">
                      Students: {classs.students}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
        <div className="pt-3">
          <Link href="/teachers/classrooms/create">
            <a>Create a new classroom</a>
          </Link>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Classrooms;
