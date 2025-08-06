import React, { useContext } from "react";
import "./ProductDisplay.css";
import { StoreContext } from "../context/StoreContext"; 
import ProductItem from "./ProductItem"; 
import { getImageUrl } from "../utils/getImageUrl";

const ProductDisplay = ({ category }) => {
  const { products } = useContext(StoreContext);
  return (
    <div className="product-display" id="product-display">
      <h2>Top products for you</h2>
      <div className="product-display-list">
        {products.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={getImageUrl(item.image)}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProductDisplay;