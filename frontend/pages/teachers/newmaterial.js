import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TeacherLayout } from "../../components/layout";
import { TeacherNavbar } from "../../components/navbar";
import { POSTHeader } from "../../services/functions";

const NewMaterial = () => {
  const [addedSuccesfully, setAddedSuccesfully] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    fetch(`/api/teacher/createinfo/`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setClassrooms(json.classesCreated);
      });
  }, []);

  const questions = [
    {
      q: "Text alternatives: how much non-text content has text alternatives",
      a: [
        "AAA: all non-text content has text alternatives",
        "AA: majority of non-text content has text alternatives",
        "A: some non-text content has text alternatives",
        "Non-compliant: no text alternatives are provided",
      ],
    },
    {
      q: "Time-based media: now much of time based media has alternatives",
      a: [
        "AAA: all non-text content has text alternatives",
        "AA: majority of non-text content has text alternatives",
        "A: some non-text content has text alternatives",
        "Non-compliant: no text alternatives are provided",
      ],
    },
    {
      q:
        "Adaptability: is content presented in a simplified way that is compatible with a screen reader",
      a: [
        "AAA: all content is presented in a simplified way",
        "AA: majority of content is presented in a simplified way",
        "A: only a small fraction of content is presented in a simplified way",
        "Non-compliant: no content is presented in a simplified way",
      ],
    },
    {
      q:
        "Distinguishability: is viewing of web content simplified for the user",
      a: [
        "AAA: foreground and background color can be modified",
        "AA: Sound management mechanism is separated from system for web site navigation",
        "A: colors do not carry information",
        "Non-compliant: content is nod made easily distinguishable for the user",
      ],
    },
    {
      q:
        "Keyboard accessibility: is the web content accessible with the keyboard",
      a: [
        "AAA: the whole web site is accessible with the keyboard",
        "AA: most of the web site is accessible with the keyboard",
        "A: main parts of web site are accessible with the keyboard",
        "Non-compliant: web content is completely inaccessible with the keyboard",
      ],
    },
    {
      q:
        "Time limitation for interacting with the web content: is interaction with the web site time limited",
      a: [
        "AAA: web site contains no time limited content",
        "AA: user has the possibility to set speed of time limited content for all time limited content",
        "A: user has the possibility to set speed for most of time limited content",
        "Non-compliant: web content requires a lot of time-limited interaction",
      ],
    },
    {
      q: "Navigation: does the website support easy navigation",
      a: [
        "AAA: purpose and location (inside the same web site/outside) is clear from the name of the link",
        "AA: web content supports different ways to navigate to it",
        "A: navigation sequence between web contents is logical and intuitive",
        "Non-compliant: navigation on the web content is difficult and unintuitive",
      ],
    },
    {
      q: "Readability: is the content readable and understandable",
      a: [
        "AAA: the content has support for different levels of reading (simplified versions of content are available)",
        "AA: All parts of web content (if applicable) have marked the language in which they are written",
        "A: It is marked in which language the web site is written",
        "Non-compliant: web content is written in different languages and is written in difficult to understand style",
      ],
    },
    {
      q:
        "Predictability: are web sites organized in a logical and predictable way",
      a: [
        "AAA: Bigger changes to the user interface that happen automatically can be disabled",
        "AA: Navigation of the website is consistent across all parts of the website",
        "A: Changes to the user interface do not happen automatically",
        "Non-compliant: interaction of web site with the user is inherently unpredictable",
      ],
    },
    {
      q:
        "Help with input: Web site automatically detects and corrects input mistakes from the user",
      a: [
        "AAA: Web site provides context aware help with instructions and recommendations for input",
        "AA: In case the user makes an input mistake web site automatically suggests corrections",
        "A: Web site automatically detects input mistake",
        "Non-compliant: there is no help with user input",
      ],
    },
  ];
  const topics = [
    "Perception",
    null,
    null,
    null,
    "Operability",
    null,
    null,
    "Understandability",
    null,
    null,
  ];
  const ClassSelector = () => {
    const handleClass = (name) => {
      if (name === selectedClassroom) {
        //pass
      } else {
        setSelectedClassroom(name);
      }
    };
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedClassroom ? selectedClassroom : "Select classroom"}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {classrooms.map((single) => (
            <div
              className={
                "dropdown-item " +
                (selectedClassroom === single ? "active" : "")
              }
              onClick={() => handleClass(single)}
              key={single}
            >
              {single}
            </div>
          ))}
        </div>
      </div>
    );
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    const arr = () => {
      var x = [];
      for (var i = 0; i < 10; i++) {
        x.push(parseInt(e.target[i + 3].value));
      }
      return x;
    };
    fetch(`/api/user/material/add`, {
      ...POSTHeader(),
      body: JSON.stringify({
        name: e.target[0].value,
        dname: e.target[1].value,
        url: e.target[2].value,
        vector: arr(),
        add_to: selectedClassroom,
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
  return (
    <TeacherLayout>
      <TeacherNavbar />
      <div className="maxer-800 mx-auto px-3 px-lg-0 pt-128">
        {addedSuccesfully ? (
          <div className="alert alert-success">Material added succesfully</div>
        ) : null}
        {failed ? (
          <div className="alert alert-danger">Material not added</div>
        ) : null}
        <h4>Introduction</h4>
        <p className="maxer-625 py-3">
          Attribute representation serves as the basis for recommendation
          system. Recommender sees the materials just as collection of their
          attributes; it is important for the attribute description to be
          accurate and comprehensive. Attribute description is based on ISO
          40500:2012 standard.
        </p>
        {selectedClassroom ? (
          <p>
            Material will be added to <b>{selectedClassroom}</b>
          </p>
        ) : (
          <p className="text-primary">
            Select classroom to add new material to it automatically
          </p>
        )}
        <ClassSelector />
        <hr />

        <form onSubmit={HandleSubmit}>
          <div className="form-row pb-4">
            <div className="col">
              <label htmlFor="name">Name of the material</label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Name"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="dname">Name of the material (public)</label>

              <input
                id="dname"
                type="text"
                className="form-control"
                placeholder="Display Name"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputUrl">Link of the material</label>
            <input
              type="text"
              className="form-control"
              id="inputUrl"
              placeholder="https://"
              required
            />
          </div>
          {questions.map((question, index) => (
            <>
              {topics[index] ? (
                <h4 className="py-1 my-0">{topics[index]}</h4>
              ) : null}
              <div key={index} label={index}>
                <div className="form-group maxer-625 mt-2" key={index}>
                  <label htmlFor="Select1" className="text-dark">
                    {question.q}
                  </label>
                  <select className="form-control" id="Select1">
                    {question.a.map((a, index) => (
                      <option value={3 - index} key={index}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ))}
          <div className="pb-5">
            <button type="submit" className="button-green px-3 mb-2 mt-4">
              Add material
            </button>
          </div>
        </form>
      </div>
    </TeacherLayout>
  );
};

export default NewMaterial;
