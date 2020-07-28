import React from "react";
import { TeacherLayout } from "../../components/layout";
import { TeacherNavbar } from "../../components/navbar";

const Index = () => {
  return (
    <TeacherLayout>
      <TeacherNavbar />
      <header className="bg-white pt-5 pt-sm-0" style={{ zIndex: "-100" }}>
        <div className="mx-auto maxer contents">
          <div className="row no-gutters my-auto pt-0 pt-sm-5 pt-lg-0 mt-0 mt-sm-5 mt-lg-0">
            <div className="col-md-12 col-lg-6 my-auto">
              <div className="main-content pl-1 ml-4">
                <h1 className="text-black text-main-header">Understand</h1>
                <h4 className="body-2">your students with</h4>
                <h1 className="text-black text-main-header">
                  <b className="d-block">PYTHIA</b>
                </h1>
                <p className="mt-3 pt-3 text-black w-100 body-2 pb-2 pr-4 pr-md-3">
                  Understand your students' accessibility preferences and
                  monitor their progress
                </p>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 pt-md-0 pt-4">
              <div className="main-img animated fadeIn slower mx-auto mr-md-auto"></div>
            </div>
          </div>
        </div>
      </header>
    </TeacherLayout>
  );
};

export default Index;
