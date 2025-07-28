// src/components/Header.jsx
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <Link to="/home">Home</Link> | 
      <Link to="/products">Products</Link> | 
      <Link to="/view-order">My Orders</Link> | 
      <Link to="/track-order">Track Order</Link>

    </nav>
  );
};

export default Header;
