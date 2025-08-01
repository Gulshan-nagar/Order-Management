// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1740&q=80')",
        }}
      >
        {/* Top Nav */}
        <div className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-10">
          <div className="text-white/90">
            Welcome, <span className="font-semibold">{user?.name || "User"}</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover a Smarter Way to Shop
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Fast, Reliable, and Seamless Shopping Experience
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card onClick={() => navigate("/products")} className="hover:shadow-lg cursor-pointer transition-all">
            <CardContent className="text-center p-6">
              <div className="text-4xl mb-2">🛍️</div>
              <CardTitle>Browse Products</CardTitle>
              <CardDescription>Explore a wide range of items</CardDescription>
            </CardContent>
          </Card>

          <Card onClick={() => navigate("/view-order")} className="hover:shadow-lg cursor-pointer transition-all">
            <CardContent className="text-center p-6">
              <div className="text-4xl mb-2">📋</div>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>Check your past purchases</CardDescription>
            </CardContent>
          </Card>

          <Card onClick={() => navigate("/view-order")} className="hover:shadow-lg cursor-pointer transition-all">
            <CardContent className="text-center p-6">
              <div className="text-4xl mb-2">🔍</div>
              <CardTitle>Track Order</CardTitle>
              <CardDescription>Monitor your delivery in real-time</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Popular Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Choose from the trending categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: "📱", name: "Electronics" },
              { icon: "👗", name: "Fashion" },
              { icon: "🏡", name: "Home" },
              { icon: "⚽", name: "Sports" },
              { icon: "📚", name: "Books" },
              { icon: "💄", name: "Beauty" },
            ].map((category, idx) => (
              <Card
                key={idx}
                onClick={() => navigate("/products")}
                className="hover:shadow-md cursor-pointer transition-all"
              >
                <CardContent className="text-center p-6">
                  <div className="text-3xl mb-1">{category.icon}</div>
                  <CardTitle className="text-base">{category.name}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Wave */}
      <div className="mt-[-1px]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 text-gray-100"
        >
          <path
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HomePage;
