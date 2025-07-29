import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS, BASE_URL } from "../utils/apiPaths";
import { io } from "socket.io-client";

const socket = io("https://order-management-4pdd.onrender.com");

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl shadow p-4 bg-white"
            >
              <p className="text-sm text-gray-500 mb-2">
                <strong>Order ID:</strong> {order._id}
              </p>

              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 border-t pt-4 mt-2"
                >
                  {item.product ? (
                    <>
                      <img
                        src={`${BASE_URL}${item.product.image}`}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded"
                       
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: ₹{item.product.price}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-red-600">
                      ⚠️ Product no longer available
                    </p>
                  )}
                </div>
              ))}

              <p className="mt-4 text-sm">
                <strong>Status:</strong>{" "}
                <span className="text-blue-600 font-semibold">
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