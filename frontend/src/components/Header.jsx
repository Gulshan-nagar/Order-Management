import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Bell, LogOut } from "lucide-react";

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
      await axiosInstance.post(API_PATHS.LOGOUT, {});
    } catch (err) {
      console.error("Logout failed:", err);
    }
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <header className="relative text-white shadow-lg">
      {/* Background Image */}
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center brightness-75"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1400&q=80')",
        }}
      ></div>

      {/* Navbar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">

          <h1 className="text-3xl font-bold tracking-wider text-yellow-300">OMS</h1>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-base font-medium">
          <Link to="/home" className="hover:text-yellow-300 transition cursor-pointer">
            Home
          </Link>
          <Link to="/products" className="hover:text-yellow-300 transition cursor-pointer">
            Products
          </Link>
          <Link to="/view-order" className="hover:text-yellow-300 transition cursor-pointer">
            My Orders
          </Link>
          <Link to="/cart" className="hover:text-yellow-300 transition cursor-pointer">
            🛒 Cart
          </Link>
          <Bell className="w-5 h-5 mt-[2px] hover:text-yellow-300 cursor-pointer" />
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg flex items-center space-x-2 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="hover:text-yellow-300 transition cursor-pointer">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
