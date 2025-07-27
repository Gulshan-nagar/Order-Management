// src/pages/createOrder.jsx
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useEffect, useState } from "react";

function CreateOrder() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.PRODUCTS.GET_ALL);
        setProducts(res.data);
      } catch (err) {
        alert("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

const handleOrder = async (e) => {
  e.preventDefault();

  try {
    const orderPayload = {
      items: [
        {
          product: selectedProduct,
          quantity: Number(quantity),
        },
      ],
      paymentStatus: "UNPAID", // or "PAID" if collected
    };

    console.log("Sending payload:", orderPayload);

    await axiosInstance.post(API_PATHS.ORDER.CREATE_ORDER, orderPayload);
    alert("✅ Order placed successfully");
  } catch (err) {
    console.error("Order error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "❌ Failed to place order");
  }
};



  return (
    <div className="place-order">
      <h2>Place Order</h2>
      <form onSubmit={handleOrder}>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          required
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} (Stock: {p.stock})
            </option>
          ))}
        </select><br />
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(e.target.value)}
          required
        /><br />
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default CreateOrder;
