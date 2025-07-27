import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  const cards = [
    {
      title: "Manage Users",
      icon: "👥",
      path: "/admin/users",
      bg: "bg-blue-100",
    },
    {
      title: "Manage Products",
      icon: "🛒",
      path: "/admin/products",
      bg: "bg-green-100",
    },
    {
      title: "Manage Orders",
      icon: "📦",
      path: "/admin/orders",
      bg: "bg-yellow-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-wide">
          👨‍💼 Admin Dashboard
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => goTo(card.path)}
              className={`rounded-2xl shadow-lg p-6 ${card.bg} hover:shadow-xl cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-all duration-300`}
            >
              <div className="text-5xl mb-4">{card.icon}</div>
              <h2 className="text-2xl font-semibold text-gray-700">{card.title}</h2>
              <p className="text-gray-600 mt-2 text-sm">
                Click to view, add or modify {card.title.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
