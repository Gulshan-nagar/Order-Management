// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.PRODUCTS.GET_ALL);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePlaceOrder = async (product) => {
    try {
      const orderData = {
        items: [
          {
            product: product._id,
            quantity: 1,
          },
        ],
      };

      // ✅ FIXED: use correct path
      await axiosInstance.post(API_PATHS.ORDER.CREATE_ORDER, orderData);

      alert("✅ Order placed successfully!");
      navigate("/view-order");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🛍️ Available Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-xl shadow hover:shadow-md transition bg-white"
            >
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-gray-600 mb-1">Price: ₹{product.price}</p>
              <p className="text-gray-500 text-sm mb-3">Stock: {product.stock}</p>
              <button
                onClick={() => handlePlaceOrder(product)}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                ➕ Place Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
