import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../utils/axiosInstance';
import UserLayout from "../../components/UserLayout";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/api/users/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (user.role !== "admin") {
        setError("Access denied. You are not an admin.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Clear inputs after successful login
      setEmail("");
      setPassword("");

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <UserLayout>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1650&q=80')", // ✅ Professional admin theme
        }}
      >
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Admin Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200 font-semibold"
            >
              Login
            </button>
            {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default AdminLogin;
