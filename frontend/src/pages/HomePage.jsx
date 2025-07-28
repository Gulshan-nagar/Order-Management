import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      {/* Header */}
      <nav className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold"></div>
          <div className="flex items-center gap-4">
            <div className="text-white/90">
              Welcome,{" "}
              <span className="font-semibold">{user?.name || "User"}</span>
            </div>
       
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="min-h-screen flex items-center justify-center pt-32 px-4">
        <div className="text-center text-white space-y-8 max-w-3xl">
          <h1 className="text-6xl font-bold leading-tight">
            Discover a Smarter Way to Shop
          </h1>
          <p className="text-xl text-white/80">
            Fast, Reliable, and Seamless Shopping Experience
          </p>
        </div>
      </div>

      {/* User Actions */}
      <div
        className="bg-cover bg-center py-16"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <Card
            className="hover:shadow-xl cursor-pointer"
            onClick={() => navigate("/products")}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🛍️</div>
              <CardTitle>Browse Products</CardTitle>
              <CardDescription>Explore a wide range of items</CardDescription>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-xl cursor-pointer"
            onClick={() => navigate("/view-order")}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">📋</div>
              <CardTitle>My Orders</CardTitle>
              <CardDescription>Check your past purchases</CardDescription>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-xl cursor-pointer"
            onClick={() => navigate("/track-order")}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <CardTitle>Track Order</CardTitle>
              <CardDescription>
                Monitor your delivery in real-time
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Categories */}
      <div
        className="bg-cover bg-center py-16"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?auto=format&fit=crop&w=1740&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Popular Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Choose from the trending categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
                className="text-center hover:shadow-lg cursor-pointer"
                onClick={() => navigate("/products")}
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <CardTitle>{category.name}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 text-white/10"
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
