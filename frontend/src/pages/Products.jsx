import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
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

  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const placeOrder = async () => {
    try {
      const orderItems = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      await axiosInstance.post(API_PATHS.ORDER.CREATE_ORDER, {
        items: orderItems,
      });

      alert("Order placed successfully!");
      setCart([]);
    } catch (error) {
      alert("Failed to place order. Please login first.");
      navigate("/login");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow">
            <h3 className="font-semibold">{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Stock: {product.stock}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">Your Cart</h3>
          {cart.map((item) => (
            <p key={item._id}>
              {item.name} × {item.quantity}
            </p>
          ))}
          <button
            onClick={placeOrder}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
