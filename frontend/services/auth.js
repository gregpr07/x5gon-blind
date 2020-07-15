export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("blindUser")
    ? JSON.parse(window.localStorage.getItem("blindUser"))
    : {};

const setUser = (user) =>
  isBrowser()
    ? window.localStorage.setItem("blindUser", JSON.stringify(user))
    : null;

export const handleLogin = (username) => {
  if (username) {
    fetch(`/api/user/myprofile/`)
      .then((res) => res.json())
      .then((json) => {
        console.log("logging in");
        setUser({
          username: json.name,
          is_teacher: json.is_teacher,
        });
        window.history.back();
      });
  }
  return false;
};

export const updateData = () => {
  fetch(`/api/user/myprofile/`)
    .then((res) => res.json())
    .then((json) => {
      setUser({
        username: json.name,
        is_teacher: json.is_teacher,
      });
    });
  return false;
};

export const isLoggedIn = () => {
  const user = getUser();

  return !!user.username;
};

export const isTeacher = () => {
  const user = getUser();

  return !!user.is_teacher;
};

export const getUserName = () => {
  const user = getUser();
  return user.username;
};

export const logout = (callback) => {
  setUser({});
  callback();
};
