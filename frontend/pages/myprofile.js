import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import PrivateRoute from "../components/privateRoute";
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
      <div className="">
        {successfully ? (
          <div className="alert alert-success">{successfully}</div>
        ) : null}
        <form onSubmit={resetPassword} className="">
          <h5>Change your password</h5>
          <div className="form-group mt-4">
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
          <button
            type="submit"
            className="btn btn-lg btn-outline-primary btn-block"
          >
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
        <div className="text-dark container">
          {/* animated fadeIn  */}
          <div className="">
            <div className="mx-auto">
              <h3 className="text-green">My profile</h3>
              {!profile ? null : (
                <div className="text-left maxer-500 mx-auto">
                  <div className="list-group list-group-flush py-5">
                    <p className="list-group-item">User: {profile.name}</p>
                    <p className="list-group-item">
                      Type:{" "}
                      {profile.type === 0
                        ? "Blind student"
                        : "Partially blind student"}
                    </p>

                    {profile.is_teacher ? (
                      <p className="list-group-item">You are a teacher</p>
                    ) : (
                      <UpgradeTeacher />
                    )}
                  </div>

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
