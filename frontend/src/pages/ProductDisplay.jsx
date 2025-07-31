import React, { useContext } from "react";
import "./ProductDisplay.css";
import { StoreContext } from "../context/StoreContext"; 
import ProductItem from "./ProductItem"; 
const ProductDisplay = ({ category }) => {
  const { Product_list } = useContext(StoreContext);
  return (
    <div className="product-display" id="product-display">
      <h2>Top products for you</h2>
      <div className="product-display-list">
        {Product_list.map((item, index) => {
          if ((category = "All" || category === item.category)) {
            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProductDisplay;