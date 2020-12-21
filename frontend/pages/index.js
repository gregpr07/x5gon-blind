import React from "react";
import Link from "next/link";
import { Layout } from "../components/layout";
import Navbar from "../components/navbar";
import { isLoggedIn, isTeacher } from "../services/auth";

const Index = (props) => {
  const Header = () => (
    <div>
      <div className="position-relative overflow-hidden p-3 pt-5 mt-3 mt-md-0 p-md-5 m-md-3 text-center bg-light">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h2 className="display-3 font-weight-normal">
            Pythia blind assistant
          </h2>
          <p className="lead font-weight-normal">
            Recommendation engine, based on scalable, interpretable Bayesian
            Opposition based classifier.
          </p>
        </div>
        <div className="product-device shadow-sm d-none d-md-block" />
        <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
      </div>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
          <div className="my-3 py-3">
            <h2 className="display-5">Students</h2>
            <p className="lead">Learn</p>
          </div>
          <div
            className="bg-light shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "200px",
              borderRadius: "21px 21px 0 0",
            }}
          >
            <div
              style={{
                paddingTop: "90px",
              }}
            >
              <Link href={isLoggedIn() ? "/portal" : "/signup"}>
                <a className="btn btn-outline-secondary" href="#">
                  {isLoggedIn() ? "Student portal" : "Sign up for free"}
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 p-3">
            <h2 className="display-5">Teachers</h2>
            <p className="lead">Manage</p>
          </div>
          <div
            className="bg-dark shadow-sm mx-auto"
            style={{
              width: "80%",
              height: "200px",
              borderRadius: "21px 21px 0 0",
            }}
          >
            <div
              style={{
                paddingTop: "90px",
              }}
            >
              <Link
                href={
                  isLoggedIn()
                    ? isTeacher()
                      ? "/teachers"
                      : "/myprofile"
                    : "/signup"
                }
              >
                <a className="btn btn-outline-secondary" href="#">
                  {isLoggedIn()
                    ? isTeacher()
                      ? "Teachers portal"
                      : "Upgrade account"
                    : "Sign up for free"}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const descriptions = [
    {
      title: "Core ML principles",
      body: (
        <div>
          Two objectives for a ML algorithm that is used for material
          recommendation were:
          <ul className="m-0 ml-5 p-0">
            <li>Ability to learn efficiently/on small datasets</li>
            <li>Ability to provide explanation about the recommendations</li>
          </ul>
          To achieve these goals, a variant of Bayesian classifier was adopted
          to work in a recommendation setting. Because of these specific goals,
          standard recommendation approaches (such as collaborative filtering)
          could nod be used in this application. Details about the algorithmic
          approach used are described in the technical documentation.
        </div>
      ),
      image: "core-ml.png",
      first: true,
    },
    {
      title: "Functionality for students",
      body: (
        <div>
          The core functionality of the Pythia Blind recommendation engine is to
          rank available materials to the student according to their level of
          accessibility. The system learns each individual student’s
          accessibility preferences and then ranks teaching materials
          accordingly. To simplify the user interface, teaching materials are
          organized into classrooms that require not text input for search
          (selection of appropriate materials is selected and organized into
          classrooms by teachers). The core functionality can also be integrated
          as a service into other platforms and services (such as search or even
          other recommendation services).
          <br />
          User interface for students is minimalistic in design – the main
          design principle behind the UI was to limit the number of necessary
          interactions (clicks, text inputs ect.). It is also designed in
          accordance with ISO accessibility guidelines for blind and partially
          blind users.
        </div>
      ),
      image: "students.png",
      first: false,
    },
    {
      title: "Why do we need individualized recommendations?",
      body:
        "Recommendation engine is built upon ISO accessibility guidelines. With inception of this service, our core assumption was that different standards are differently important to different students. A single material (that conforms to some but not all standards) can thus be accessible to one student but inaccessible to another. This basic assumption was confirmed in our beta testing and presented in the conference (Molan, Bulathwela, Orlič 2020).",
      image: "guideline.png",
      first: true,
    },
    {
      title: "Functionality for teachers",
      body: (
        <div>
          The Pythia recommendation webservice is designed in a way that helps
          teachers manage the work with their students. Teachers import
          materials into Pythia (either directly from X5Gon or as web links) and
          organize them into classrooms (like 6th grade biology). Then teachers
          assign students to appropriate classrooms (each student can be
          assigned to multiple classrooms). Because the target students have
          limitations in their ability to interact with a computer, all
          organizational and management activities are relegated to their
          teachers (adding materials, managing classroom lists, creating new
          classrooms…).
          <br />
          Besides the ability to organize their teaching process, Pythia also
          visualizes the parameters learned about students (both as individuals
          and for the whole classrooms). Visualizations and explanations are
          built on the properties of the recommendation algorithm used and are
          explained in a teachers’ guide.
        </div>
      ),
      image: "teachers.png",
      first: false,
    },
  ];

  const Descriptor = ({ title, body, image, first }) => (
    <div className="row pb-2 mt-lg-4 mt-2 mt-lg-0">
      <div className="col-lg-7">
        <h4>{title}</h4>
        <p className="lead font-weight-normal text-left mt-3">{body} </p>
      </div>
      <div
        className={`col-lg-5 order-lg-${first ? "first" : "last"} order-first`}
      >
        <img
          src={`/imgs/${image}`}
          alt={image}
          height={"400px"}
          width={"100%"}
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );

  const Description = () => (
    <div className="position-relative overflow-hidden p-3 pt-5 mt-3 mt-md-0 p-md-5 m-md-3 text-center">
      <div className="container">
        <div className="col-md-9 p-lg-5 mx-auto ">
          <p className="lead font-weight-normal">
            Blind recommendation engine is a ML service designed to filter out
            materials for blind and partially blind students. It is built on the
            principles of transparency, interpretability and efficiency of
            learning. For its operation it requires no previous personal
            information about the users; through students’ interactions with the
            system, it learns their preferences which it then displays to the
            teachers.
          </p>
        </div>
        {/* Example row of columns */}
        {descriptions.map((desc) => Descriptor(desc))}
      </div>
    </div>
  );
  return (
    <Layout hideTopMargin={true}>
      <Navbar />
      <Header />
      <Description />
    </Layout>
  );
};

export default Index;
