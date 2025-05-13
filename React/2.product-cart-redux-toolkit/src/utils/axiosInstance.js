import axios from "axios";
import { getAuthToken } from "./auth";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7227/api/Auth/login",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
