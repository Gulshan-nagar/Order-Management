import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);

  // Sample fallback data
  const sampleProducts = [
    {
      _id: "1",
      name: "Veg Masala Burger",
      description: "Delicious vegetarian burger with spicy masala",
      price: 299,
      image: "/src/assets/product_1.jpeg",
      category: "Food",
      rating: 4.5
    },
    {
      
    _id: "4",
    name: "Wireless Earbuds",
    description: "Bluetooth 5.0 Earbuds with high-quality sound",
    price: 1999,
    image: "/src/assets/product_2.jpeg", // or any valid image path
    category: "Electronics",
    rating: 4.3
    },
    {
      _id: "3",
      name: "Red Sauce Pasta",
      description: "Authentic Italian pasta with rich tomato sauce",
      price: 399,
      image: "/src/assets/product_3.jpeg", 
      category: "Food",
      rating: 4.6
    }
  ];

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.PRODUCTS.GET_ALL);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Use fallback data if backend is not available
        console.log("Using fallback sample data");
        setProducts(sampleProducts);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const placeOrder = async () => {
    try {
      const orderItems = Object.keys(cartItems)
        .filter(id => cartItems[id] > 0)
        .map(id => ({
          product: id,
          quantity: cartItems[id]
        }));

      if (orderItems.length === 0) {
        throw new Error("Cart is empty");
      }

      const response = await axiosInstance.post(API_PATHS.ORDER.CREATE_ORDER, {
        items: orderItems
      });

      // Clear cart after successful order
      setCartItems({});
      return response.data;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

  const contextValue = {
    products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    placeOrder,
    loading
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider