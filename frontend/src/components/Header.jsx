import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Bell, LogOut, Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // for mobile menu toggle

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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <h1 className="text-3xl font-bold tracking-wider text-yellow-300">OMS</h1>
        </Link>

        {/* Hamburger Menu Icon (Mobile only) */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-base font-medium items-center">
          <Link to="/home" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-yellow-300 transition">
            Products
          </Link>
          <Link to="/view-order" className="hover:text-yellow-300 transition">
            My Orders
          </Link>
          <Link to="/cart" className="hover:text-yellow-300 transition">
            🛒 Cart
          </Link>
          <Bell className="w-5 h-5 mt-[2px] hover:text-yellow-300 cursor-pointer" />
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg flex items-center space-x-2 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="hover:text-yellow-300 transition">
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-sm px-6 py-4 space-y-4 text-white text-base font-medium">
          <Link to="/home" onClick={() => setIsOpen(false)} className="block hover:text-yellow-300">
            Home
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="block hover:text-yellow-300">
            Products
          </Link>
          <Link to="/view-order" onClick={() => setIsOpen(false)} className="block hover:text-yellow-300">
            My Orders
          </Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="block hover:text-yellow-300">
            🛒 Cart
          </Link>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 hover:text-yellow-300" />
            {user ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
