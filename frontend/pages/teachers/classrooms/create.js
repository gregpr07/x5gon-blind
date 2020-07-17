import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TeacherLayout } from "../../../components/layout";
import { TeacherNavbar } from "../../../components/navbar";
import { POSTHeader } from "../../../services/functions";

const CreateClassroom = () => {
  const [classroom, setClassroom] = useState();
  const [description, setDescription] = useState();
  const [students, setStudents] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [selMaterials, setSelMaterials] = useState([]);

  const [addedSuccesfully, setAddedSuccesfully] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleResponse = (json) => {
    setMaterials(json.materials);
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
    fetch(`/api/teacher/create-classroom/`, {
      ...POSTHeader(),
      body: JSON.stringify({
        name: classroom,
        description: description,
        materials: selMaterials,
        students: [],
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
    fetch(`/api/teacher/createinfo/`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        handleResponse(json);
      });
  }, []);

  return (
    <TeacherLayout>
      <TeacherNavbar />
      <div className="maxer mx-auto px-md-5 text-dark pt-128">
        {addedSuccesfully ? (
          <div className="alert alert-success">Classroom added succesfully</div>
        ) : null}
        {failed ? (
          <div className="alert alert-danger">Classroom not added</div>
        ) : null}
        <h4 className="py-3">Classroom creator</h4>
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
                <ul className="list-group" id="materials">
                  {materials.map((mat) => (
                    <li
                      key={mat}
                      className={
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
            </div>
            <button className="btn btn-primary" type="submit">
              Create classroom
            </button>
          </form>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default CreateClassroom;
