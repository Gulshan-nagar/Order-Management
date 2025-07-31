import React, { useContext} from 'react';
import './ProductItem.css';
import { assets } from '../assets/assets'; 
import { StoreContext } from '../context/StoreContext'; 

const ProductItem = ({ id, name, image, price, description }) => {
  
    const{cartItem,addToCart,removeFromCart}=useContext(StoreContext)
  return (
    <div className="product-item">
      <div className="product-item-img-container">
        <img className="product-item-image" src={image} alt={name} />
        {
  !cartItem[id] ? (
    <img
      className="icon-img"
      id='add'
      onClick={() => addToCart(id)}
      src={assets.plus_white}
      alt=""
    />
  ) : (
    <div className="product-item-counter">
      <img
        className="icon-img"
        onClick={() => removeFromCart(id)}
        src={assets.minus}
        alt=""
      />
      <p>{cartItem[id]}</p>
      <img
        className="icon-img"
        onClick={() => addToCart(id)}
        src={assets.plus_green}
        alt=""
      />
    </div>
  )
}

      </div>
      <div className="product-item-info">
        <div className="product-item-header">
          <p className="product-item-name">{name}</p>
          <img className="product-item-rating" src={assets.rating_starts} alt="rating" />
        </div>
        <p className="product-item-desc">{description}</p>
        <p className="product-item-price">${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;

