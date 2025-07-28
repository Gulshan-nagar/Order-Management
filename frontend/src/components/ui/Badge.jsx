import React from "react";

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Delivered: "bg-green-200 text-green-800",
  Cancelled: "bg-red-200 text-red-800",
};

const Badge = ({ status }) => {
  const color = statusColors[status] || "bg-gray-200 text-gray-800";

  return (
    <span className={`text-sm px-3 py-1 rounded-full font-medium ${color}`}>
      {status}
    </span>
  );
};

export default Badge;
