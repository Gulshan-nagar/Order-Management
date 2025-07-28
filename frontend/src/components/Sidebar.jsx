import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { title: "Dashboard", path: "/admin/dashboard" },
    { title: "Manage Users", path: "/admin/users" },
    { title: "Manage Products", path: "/admin/products" },
    { title: "Manage Orders", path: "/admin/orders" },
  ];

  return (
    <aside className="w-64 bg-white border-r h-screen p-6 shadow-md hidden md:block sticky top-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ Admin Panel</h2>
      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;