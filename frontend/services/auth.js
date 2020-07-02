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
    return setUser({
      username: username,
    });
  }

  return false;
};

export const isLoggedIn = () => {
  const user = getUser();

  return !!user.username;
};

export const getUserName = () => {
  const user = getUser();
  return user.username;
};

export const logout = (callback) => {
  setUser({});
  callback();
};
