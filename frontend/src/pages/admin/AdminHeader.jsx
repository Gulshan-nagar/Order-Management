import React from "react";
import { Bell, LogOut, Users, ShoppingCart, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data (if stored in localStorage)
    localStorage.removeItem("userInfo");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side Title */}
        <h1
          className="text-2xl font-bold text-orange-600 flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/Dashboard")}
        >
          <span className="text-3xl">🧑‍💼</span> Admin Panel
        </h1>

        {/* Center Navigation Links */}
        <nav className="flex gap-6 text-gray-700 font-medium">
          <button
            className="flex items-center gap-1 hover:text-orange-600 transition"
            onClick={() => navigate("/admin/users")}
          >
            <Users className="w-5 h-5" /> Users
          </button>
          <button
            className="flex items-center gap-1 hover:text-orange-600 transition"
            onClick={() => navigate("/admin/products")}
          >
            <Package className="w-5 h-5" /> Products
          </button>
          <button
            className="flex items-center gap-1 hover:text-orange-600 transition"
            onClick={() => navigate("/admin/orders")}
          >
            <ShoppingCart className="w-5 h-5" /> Orders
          </button>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-gray-700">
          <div className="hidden sm:block">
            Welcome, <span className="font-semibold">Admin</span>
          </div>

          <button className="relative hover:text-orange-600 transition">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          <button
            className="hover:text-red-600 transition"
            onClick={handleLogout}
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
