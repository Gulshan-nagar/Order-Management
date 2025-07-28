import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-10 shadow-inner">
      <div className="text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} FreshFoody Admin Dashboard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
