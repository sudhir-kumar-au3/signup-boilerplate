import axios from "axios";
const BASE_API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-Type": "application/json",
  },
  withCredentials: true,
});
export default BASE_API;
