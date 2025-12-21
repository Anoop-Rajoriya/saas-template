import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (res) => res,
  (err) => {
    const msg =
      err.response.data.message || err.message || "Something want wrong!";
    return Promise.reject(new Error(msg));
  }
);
