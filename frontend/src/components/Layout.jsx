// ✅ 2. Layout.js (src/components/Layout.js)
import React from "react";
import AdminHeader from "../pages/admin/AdminHeader";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:ml-64">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;