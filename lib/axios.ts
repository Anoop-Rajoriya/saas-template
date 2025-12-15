import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response.data.message || err.message || "Something want wrong!";

    return Promise.reject(new Error(message));
  }
);

export default api;
