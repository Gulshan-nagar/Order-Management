import axios from "axios";

// Set base URL with localhost development support
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? "http://localhost:5000" : "https://order-management-4pdd.onrender.com");

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
