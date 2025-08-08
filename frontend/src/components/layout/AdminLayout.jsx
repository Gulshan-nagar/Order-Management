import React from "react";
import AdminHeader from "../../pages/admin/AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Toaster } from "../ui/toaster";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 md:ml-64 bg-background">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLayout;