import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, API_PATHS } from "../utils/apiPaths"; 

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const res = await axios.get(`${BASE_URL}${API_PATHS.ORDER.GET_ORDER_BY_ID(orderId)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(res.data);
      setError("");
    } catch (err) {
      setError("Order not found or unauthorized");
      setOrder(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Track Your Order</h2>

        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <button
          onClick={handleTrack}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition"
        >
          Track
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {order && (
          <div className="mt-6 text-left">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
