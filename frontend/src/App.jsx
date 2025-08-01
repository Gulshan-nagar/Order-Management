// src/App.jsx
import { useEffect, useState } from "react";
import socket from "./utils/socket";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import UserLayout from "./components/UserLayout";
import AdminOrders from './pages/admin/AdminOrders';
import ViewOrder from './pages/ViewOrder';
import Cart from './pages/Cart';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
    });
    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* User Routes with Layout */}
        <Route element={<UserLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/view-order" element={<ViewOrder />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
