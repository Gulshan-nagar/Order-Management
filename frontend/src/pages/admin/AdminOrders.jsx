import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS, BASE_URL } from "../../utils/apiPaths";
import Layout from "../../components/Layout";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");

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
      console.log("🟡 Updating order", id, "to status:", newStatus);
      await axiosInstance.put(API_PATHS.ORDER.UPDATE_ORDER_STATUS(id), {
        status: newStatus,
      });
      fetchOrders();
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      alert("❌ Failed to update status");
    }
  };

  const filteredOrders =
    statusFilter === "ALL"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          🧾 Admin Order Management
        </h2>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {["ALL", "PLACED", "PICKED", "SHIPPED", "DELIVERED", "REJECTED"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {status === "ALL"
                  ? "All"
                  : status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            )
          )}
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="border p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-sm text-gray-800 font-medium">
                    {order.user?.name || "Unknown User"}
                  </p>
                </div>

                <p className="font-semibold text-sm text-gray-700 mb-1">
                  Items:
                </p>
                <ul className="list-none space-y-2 text-sm text-gray-600">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <img
                        src={
                          item.product?.image
                            ? `${BASE_URL}${item.product.image}`
                            : "https://via.placeholder.com/40"
                        }
                        alt={item.product?.name || "Product"}
                        className="w-10 h-10 object-cover rounded"
                      />

                      <span>
                        {item.product?.name} × {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-3 text-sm">
                  <strong>Total:</strong> ₹{order.total}
                </p>

                <p className="text-sm mt-1">
                  <strong>Status:</strong>{" "}
                  <span className="font-semibold text-blue-600">
                    {order.status}
                  </span>
                </p>

                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  disabled={order.status === "DELIVERED"}
                  className="mt-3 w-full p-2 border rounded bg-gray-100 text-sm"
                >
                  <option value="PLACED">Pending</option>
                  <option value="PICKED">Accepted</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AdminOrders;
