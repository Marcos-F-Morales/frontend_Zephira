// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-zephira.onrender.com/api", // 👈 importante: incluye /api
});

export default api;
