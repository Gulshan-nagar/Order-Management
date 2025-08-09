import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import socket from "../utils/socket";
import OrderCard from "../components/ui/OrderCard";
import { Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.ORDER.USER_ORDERS);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    socket.on("order-status-updated", (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });
    return () => {
      socket.off("order-status-updated");
    };
  }, []);

  return (
    <div
      className="min-h-screen p-4 lg:p-6"
      style={{
        background:
          "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%), url('https://www.transparenttextures.com/patterns/cubes.png')",
        backgroundSize: "auto, 400px",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-border">
          <div className="bg-yellow-400 p-2 rounded-lg shadow-md">
            <Package className="w-6 h-6 text-black" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Your Orders
          </h1>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-card/60 rounded-xl shadow-md backdrop-blur-sm border border-border">
            <div className="w-32 h-32 mx-auto mb-8 bg-muted/30 rounded-full flex items-center justify-center shadow-inner">
              <Package className="w-16 h-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              No Orders Yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="amazon-button-yellow gap-2 inline-flex items-center"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          // Orders List
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={order._id} className="relative">
                {index > 0 && (
                  <div className="absolute -top-3 left-0 right-0 h-px bg-border" />
                )}
                <div className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
                  <OrderCard order={order} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
