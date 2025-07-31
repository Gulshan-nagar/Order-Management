import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/apiPaths";

const Cart = () => {
  const { cartItems, products, removeFromCart, addToCart, getTotalCartAmount, getTotalCartItems, placeOrder } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isOrdering, setIsOrdering] = useState(false);

  const cartProducts = products.filter(product => cartItems[product._id] > 0);
  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 50;
  const totalAmount = getTotalCartAmount() + deliveryFee;

  const handlePlaceOrder = async () => {
    try {
      setIsOrdering(true);
      await placeOrder();
      alert("Order placed successfully!");
      navigate("/view-order");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🛒 Shopping Cart</h1>

        {cartProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <button 
              onClick={() => navigate("/products")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Cart Items ({getTotalCartItems()})</h2>
                <div className="space-y-4">
                  {cartProducts.map((product) => (
                    <div key={product._id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={`${BASE_URL}${product.image}`}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-green-600 font-bold">₹{product.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="font-semibold min-w-[2rem] text-center">
                          {cartItems[product._id]}
                        </span>
                        <button
                          onClick={() => addToCart(product._id)}
                          className="w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ₹{product.price * cartItems[product._id]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{getTotalCartAmount()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isOrdering}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-semibold"
                >
                  {isOrdering ? "Placing Order..." : "Place Order"}
                </button>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-3">Promo Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
