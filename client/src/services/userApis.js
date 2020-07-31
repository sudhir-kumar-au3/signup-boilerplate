import axios from "./api";
export const signUp = (newUser) => {
  return axios.post("/user/register", {
    name: newUser.name,
    email: newUser.email,
    mobile: newUser.mobile,
    password: newUser.password,
  });
};

export const login = (user) => {
  return axios.post("/user/login", {
    email: user.email,
    password: user.password,
    mobile: user.mobile,
  });
};

export const logout = () => {
  return axios.get("/user/logout");
};
