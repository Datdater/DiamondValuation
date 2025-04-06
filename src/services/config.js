import axios from "axios";
import AuthService from "./auth.service.js";

export const beURL = "https://diamond-valuation-system.onrender.com/api/v1/";

export const http = axios.create({
  //baseURL: "http://localhost:8080/api/v1/",
  baseURL: beURL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = AuthService.getCurrentToken();
    const user = AuthService.getCurrentUser();
    const accessToken = token?.accessToken;
    if (user && token && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
