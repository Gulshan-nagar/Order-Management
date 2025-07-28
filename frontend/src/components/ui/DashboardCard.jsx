import React from "react";

const DashboardCard = ({ title, imgSrc, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition p-6"
  >
    <img src={imgSrc} alt={title} className="w-12 h-12 mb-4" />
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);


export default DashboardCard;
