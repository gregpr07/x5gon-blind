import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import Navbar from "../src/components/navbar";
import PrivateRoute from "../src/components/privateRoute";
import { POSTHeader } from "../services/functions";
import { updateData } from "../services/auth";

const Myprofile = (props) => {
  const [profile, setProfile] = useState();
  const getStats = () => {
    fetch(`/api/user/myprofile/`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProfile(json);
      });
  };
  /*   const fetcher = (url) => fetch(url).then((r) => r.json());
  const { profile } = useSWR("/api/user/myprofile/", fetcher);
  console.log(profile); */
  useEffect(() => {
    getStats();
  }, []);
  const UpgradeTeacher = () => {
    const postTeacher = () => {
      fetch(`/api/user/myprofile/upgradeteacher/`, POSTHeader())
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          updateData();
          getStats();
        });
    };
    return (
      <div>
        <button className="btn btn-primary mt-3" onClick={postTeacher}>
          Upgrade to teacher account
        </button>
      </div>
    );
  };
  const PasswordReset = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [isError, setIsError] = useState(false);
    const [successfully, setSucessfully] = useState(false);

    const resetPassword = (e) => {
      e.preventDefault();
      fetch(`/api/rest-auth/password/change/`, {
        ...POSTHeader(),
        body: JSON.stringify({
          old_password: oldPassword,
          new_password1: password1,
          new_password2: password2,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          // success or not
          if (json.detail) {
            setIsError(false);
            setSucessfully(json.detail);
            setOldPassword("");
            setPassword1("");
            setPassword2("");
          } else {
            console.log(json);
            setIsError(json);
            setSucessfully(false);
          }
        });
    };
    const MapErrors = (obj) => {
      if (obj) {
        return obj.map((str) => (
          <div className="invalid-feedback" key={str}>
            {str}
          </div>
        ));
      } else {
        if (isError) {
          return <div class="valid-feedback">Looks good!</div>;
        } else return null;
      }
    };
    return (
      <div className="mt-5">
        {successfully ? (
          <div className="alert alert-success">{successfully}</div>
        ) : null}
        <form onSubmit={resetPassword} className="maxer-form">
          <h5>Change your password</h5>
          <div className="form-group mb-4">
            <input
              className={
                "form-control" +
                (isError.old_password
                  ? " is-invalid"
                  : isError
                  ? " is-valid"
                  : "")
              }
              type="password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              placeholder="Your old password"
              required
            />
            {MapErrors(isError.old_password)}
          </div>
          <div className="form-group">
            <input
              className={
                "form-control" +
                (isError.new_password1
                  ? " is-invalid"
                  : isError
                  ? " is-valid"
                  : "")
              }
              type="password"
              value={password1}
              onChange={(e) => {
                setPassword1(e.target.value);
              }}
              placeholder="Choose a password"
              required
            />
            {MapErrors(isError.new_password1)}
          </div>
          <div className="form-group">
            <input
              className={
                "form-control" +
                (isError.new_password2
                  ? " is-invalid"
                  : isError
                  ? " is-valid"
                  : "")
              }
              type="password"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
              placeholder="Choose a password"
              required
            />
            {MapErrors(isError.new_password2)}
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Change password
          </button>
        </form>
      </div>
    );
  };
  return (
    <PrivateRoute>
      <Layout>
        <Navbar />
        <div className="animated fadeIn text-dark">
          <div className="">
            <div className="text-green mx-auto">
              <h3>My profile</h3>
              {!profile ? null : (
                <div className="text-white mt-4 text-left maxer-500 mx-auto">
                  <h4>User: {profile.name}</h4>
                  <h4>
                    Type:{" "}
                    {profile.type === 0
                      ? "Blind student"
                      : "Partially blind student"}
                  </h4>

                  {profile.is_teacher ? (
                    <h4>You are a teacher</h4>
                  ) : (
                    <UpgradeTeacher />
                  )}

                  <PasswordReset />
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Myprofile;
