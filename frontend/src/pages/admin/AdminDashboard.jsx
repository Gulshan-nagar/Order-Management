import React from "react";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

import MetricCard from "../../components/ui/MetricCard";
import DashboardCard from "../../components/ui/DashboardCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const metrics = [
    { label: "Total Users", value: 1284, icon: "👥", bg: "bg-blue-50" },
    { label: "Revenue Today", value: "₹25,000", icon: "💰", bg: "bg-green-50" },
    { label: "New Orders", value: 43, icon: "📦", bg: "bg-yellow-50" },
  ];

  const cards = [
    { title: "Manage Users", imgSrc: "https://cdn-icons-png.flaticon.com/512/847/847969.png", path: "/admin/users" },
    { title: "Manage Products", imgSrc: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png", path: "/admin/products" },
    { title: "Manage Orders", imgSrc: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png", path: "/admin/orders" },
  ];

  return (
    <Layout>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back, stay in control of everything!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <DashboardCard
            key={i}
            title={c.title}
            imgSrc={c.imgSrc}
            onClick={() => navigate(c.path)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
