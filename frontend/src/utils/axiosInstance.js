import axios from "axios";

// Dynamically set base URL
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; // fallback to localhost

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ✅ IMPORTANT for login, cookies, CORS
});

// Attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
