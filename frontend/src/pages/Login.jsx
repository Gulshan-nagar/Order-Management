// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanedEmail = email.trim().toLowerCase();

    if (!cleanedEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: cleanedEmail,
        password,
      });

      const { token, role, name, _id } = response.data;
      const user = { _id, name, email: cleanedEmail, role };

      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(user));

      // Clear input fields after successful login
      setEmail("");
      setPassword("");

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1650&q=80')", // ✅ Food/Order-themed background
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="Order Management"
          className="w-20 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          Order System Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-700 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
