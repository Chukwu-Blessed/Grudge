import axios from "axios";

const token = JSON.parse(localStorage.getItem("grudge-data")).token;

const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
    authorization: token,
  },
});

export default api;
