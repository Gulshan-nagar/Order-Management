const OrderStatusBadge = ({ status }) => {
  const color = {
    PLACED: "bg-yellow-400",
    PICKED: "bg-blue-500",
    SHIPPED: "bg-purple-500",
    DELIVERED: "bg-green-600",
    REJECTED: "bg-red-500",
  }[status] || "bg-gray-400";

  return (
    <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;
