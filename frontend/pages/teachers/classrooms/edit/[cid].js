import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import { POSTHeader } from "../../../../services/functions";

import { TeacherLayout } from "../../../../components/layout";
import { TeacherNavbar } from "../../../../components/navbar";
import { Bubble, Radar, Line, defaults } from "react-chartjs-2";

import useSWR from "swr";
import { fetcher } from "../../../../services/functions";

const EditClassroom = (props) => {
  const router = useRouter();
  const { cid } = router.query;
  const title = cid;

  const [classroom, setClassroom] = useState();
  const [description, setDescription] = useState();
  const [students, setStudents] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [selStudents, setSelStudents] = useState([]);
  const [selMaterials, setSelMaterials] = useState([]);

  const [addedSuccesfully, setAddedSuccesfully] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleResponse = (json) => {
    setStudents(json.students);
    setMaterials(json.materials);
    setSelMaterials(json.classmaterials);
    setSelStudents(json.classstudents);
    setClassroom(json.title);
    setDescription(json.description);
  };

  const handleClick = (item, state, setstate) => {
    if (state.includes(item)) {
      setstate(state.filter((i) => i !== item));
    } else {
      setstate([...state, item]);
    }
    console.log(selMaterials);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/teacher/update-classroom/`, {
      ...POSTHeader(),
      body: JSON.stringify({
        currentname: title,
        name: classroom,
        description: description,
        materials: selMaterials,
        students: selStudents,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setAddedSuccesfully(true);
        setFailed(false);
      })
      .catch((err) => {
        setFailed(true);
        setAddedSuccesfully(false);
      });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    console.log(props);
    if (!classroom && cid) {
      fetch(`/api/teacher/classroominfo/${title}/`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          handleResponse(json);
        });
    }
  }, [cid]);

  return (
    <TeacherLayout>
      <TeacherNavbar />
      <div className="maxer mx-auto px-md-5 text-dark pt-128">
        {addedSuccesfully ? (
          <div className="alert alert-success">
            Classroom changed succesfully
          </div>
        ) : null}
        {failed ? (
          <div className="alert alert-danger">Classroom not added</div>
        ) : null}
        <h4 className="py-3">Classroom editor ({title})</h4>
        <div className="px-4 maxer-800">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputTitle">Title</label>
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                placeholder="Title of classroom"
                required
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
                maxLength="100"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputDescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="inputDescription"
                placeholder="Description of classroom"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="200"
              />
            </div>
            <div className="row selector-row">
              {/* materials */}
              <div className="form-group col">
                <label htmlFor="materials">Materials</label>
                <ul class="list-group" id="materials">
                  {materials.map((mat) => (
                    <li
                      key={mat}
                      class={
                        "list-group-item list-group-item-action " +
                        (selMaterials.includes(mat) ? "active" : "")
                      }
                      onClick={() =>
                        handleClick(mat, selMaterials, setSelMaterials)
                      }
                    >
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>
              {/* materials */}
              <div className="form-group col">
                <label htmlFor="materials">Students</label>
                <ul class="list-group" id="materials">
                  {students.map((mat) => (
                    <li
                      key={mat}
                      class={
                        "list-group-item list-group-item-action " +
                        (selStudents.includes(mat) ? "active" : "")
                      }
                      onClick={() =>
                        handleClick(mat, selStudents, setSelStudents)
                      }
                    >
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="btn btn-warning mr-3" type="submit">
              Update classroom
            </button>
            <Link href={"/teachers/classrooms/" + title}>
              <a className="btn btn-secondary" type="submit">
                Back
              </a>
            </Link>
          </form>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default EditClassroom;
