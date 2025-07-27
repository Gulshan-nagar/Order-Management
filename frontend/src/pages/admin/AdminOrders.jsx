import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATHS.ORDER.GET_ALL_ORDERS);
      setOrders(res.data);
    } catch (err) {
      alert("❌ Failed to load orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
  console.log("🟡 Updating order", id, "to status:", newStatus); // Add this

      await axiosInstance.put(API_PATHS.ORDER.UPDATE_ORDER_STATUS(id), {
        status: newStatus,

      });
      fetchOrders(); // Refresh after update
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
  alert("❌ Failed to update status");
    }
  };

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🧾 Admin Order Management
      </h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-5 rounded-lg bg-white shadow-md"
            >
              <p><strong>User:</strong> {order.user?.name || "Unknown"}</p>

              <p><strong>Items:</strong></p>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.product?.name} x{item.quantity}
                  </li>
                ))}
              </ul>

              <p className="mt-2">
                <strong>Total Price:</strong> ₹{order.total}
              </p>

              <p className="mt-2">
                <strong>Status:</strong>{" "}
                <span className="font-semibold text-blue-600">
                  {order.status}
                </span>
              </p>

              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                disabled={order.status === "Delivered"}
                className="mt-3 p-2 border rounded bg-gray-100"
              >
                 {/* ["PLACED", "PICKED", "SHIPPED", "DELIVERED"], */}
                <option value="PLACED">Pending</option>
                <option value="PICKED">Accepted</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
