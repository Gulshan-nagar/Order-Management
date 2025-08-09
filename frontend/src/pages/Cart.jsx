import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, Tag } from "lucide-react";
import CartCard from "../components/ui/CartCard";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/use-toast";

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
      toast({
        title: "Order Placed Successfully! 🎉",
        description: "Your order has been confirmed and will be delivered soon.",
      });
      navigate("/view-order");
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Order Failed",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-primary" />
          Shopping Cart
        </h1>

        {cartProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-muted/30 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Start adding some amazing products to your cart!</p>
            <button
              onClick={() => navigate("/products")}
              className="amazon-button-yellow gap-2 inline-flex items-center"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="amazon-card p-6">
                <h2 className="text-xl font-semibold mb-6 text-foreground">
                  Cart Items ({getTotalCartItems()})
                </h2>
                <div className="space-y-4">
                  {cartProducts.map((product) => (
                    <CartCard
                      key={product._id}
                      product={product}
                      quantity={cartItems[product._id]}
                      onIncrease={() => addToCart(product._id)}
                      onDecrease={() => removeFromCart(product._id)}
                      onRemove={() => {
                        // Remove all quantities of this item
                        const currentQuantity = cartItems[product._id];
                        for (let i = 0; i < currentQuantity; i++) {
                          removeFromCart(product._id);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="amazon-card p-6 shadow-premium">
                <h2 className="text-xl font-semibold mb-6 text-foreground">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{getTotalCartAmount()}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Delivery Fee</span>
                    <span className="font-medium">₹{deliveryFee}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between font-bold text-lg text-foreground">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isOrdering}
                  className="amazon-button-yellow w-full mt-6 text-base"
                >
                  {isOrdering ? "Placing Order..." : "Place Order"}
                </button>
              </div>

              <div className="amazon-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground">Promo Code</h3>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button className="amazon-button-orange px-4">
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
