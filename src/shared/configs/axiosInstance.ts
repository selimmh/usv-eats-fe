// create axios instance
import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")?.replace(/"/g, "")}`,
  },
});
