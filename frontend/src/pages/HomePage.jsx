import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-cyan-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Welcome, <span className="text-blue-600">{user?.name || "User"}</span>!
        </h1>

        {user?.isAdmin ? (
          <div className="space-y-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => navigate("/admin/orders")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition"
            >
              View All Orders
            </button>
            <button
              onClick={() => navigate("/admin/products")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition"
            >
              Manage Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => navigate("/create-order")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl transition"
            >
              Place New Order
            </button>
            <button
              onClick={() => navigate("/view-order")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl transition"
            >
              View My Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
