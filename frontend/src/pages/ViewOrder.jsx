// src/pages/ViewOrder
// .jsx
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Change to Render URL in production

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);

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
    socket.on("orderStatusUpdated", (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.off("orderStatusUpdated");
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow bg-white">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>

              {order.items.map((item, idx) => (
                <div key={idx} className="pl-4">
                  <p>
                    <strong>Product:</strong> {item.product.name}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{item.product.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                </div>
              ))}

              <p>
                <strong>Status:</strong>
                <span className="font-semibold text-blue-600 ml-2">
                  {order.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
