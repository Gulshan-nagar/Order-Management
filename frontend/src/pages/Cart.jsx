// src/pages/Cart.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/button";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalAmount,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      return navigate("/login");
    }

    const orderItems = cartItems.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    try {
      await axiosInstance.post(
        API_PATHS.ORDER.CREATE_ORDER,
        { items: orderItems },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      navigate("/view-order", { state: { orderPlaced: true } });
    } catch (error) {
      console.error("❌ Checkout failed:", error);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-sm flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>
                  ₹{item.price} x {item.quantity}
                </p>
                <p className="font-bold text-green-700">
                  Total: ₹{item.price * item.quantity}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Button onClick={() => updateQuantity(item._id, -1)}>-</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => updateQuantity(item._id, 1)}>+</Button>
                <Button
                  onClick={() => removeFromCart(item._id)}
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-right">
            <h3 className="text-xl font-bold">Total Amount: ₹{totalAmount}</h3>
            <Button className="mt-2" onClick={handleCheckout}>
              ✅ Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
