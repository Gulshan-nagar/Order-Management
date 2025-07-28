// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post(API_PATHS.LOGOUT, {}); // optional backend logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <Link to="/">🍔 Fresh Foody</Link>
        </h1>
        <nav className="flex gap-6 text-sm md:text-base">
          <Link to="/home" className="hover:text-yellow-300">Home</Link>
          <Link to="/products" className="hover:text-yellow-300">Products</Link>
          <Link to="/view-order" className="hover:text-yellow-300">My Orders</Link>
          <Link to="/track-order" className="hover:text-yellow-300">Track Order</Link>
          <Link to="/cart" className="hover:text-yellow-300">🛒 Cart</Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-yellow-300">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
