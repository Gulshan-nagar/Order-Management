// src/components/Header.jsx
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  MapPin,
  LogOut,
} from "lucide-react";
import { StoreContext } from "../context/StoreContext";

const Header = ({ searchQuery, setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getTotalCartItems, logout } = useContext(StoreContext);

  const [user, setUser] = useState(null);
  const cartCount = getTotalCartItems();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

   const handleLogout = () => {
    // Clear user data (if stored in localStorage)
    localStorage.removeItem("userInfo");
    // Redirect to login page
    navigate("/login");
  };

  
  const handleNav = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close mobile menu
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    navigate("/products");
  };

  return (
    <header className="amazon-navbar text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer hover:text-secondary transition-colors flex-shrink-0"
          onClick={() => handleNav("/products")}
        >
          Shop<span className="text-secondary">Zone</span>
        </div>

        {/* Location */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-white/90 flex-shrink-0">
          <MapPin className="w-4 h-4" />
          <div>
            <div className="text-xs text-white/70">Deliver to</div>
            <div className="font-semibold">India 110001</div>
          </div>
        </div>

        {/* Search (Desktop) */}
        <div className="hidden md:block flex-1 max-w-2xl mx-4">
          <div className="amazon-search flex">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2.5 text-foreground bg-background border-0 focus:outline-none text-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="bg-secondary px-4 py-2.5 hover:bg-secondary/90 transition-colors">
              <Search className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {user ? (
            <div className="hidden lg:flex flex-col text-sm cursor-pointer">
              <span className="text-xs text-white/70">Hello</span>
              <span className="font-semibold">{user.name}</span>
            </div>
          ) : (
            <button
              onClick={() => handleNav("/login")}
              className="hidden lg:flex flex-col text-sm hover:text-secondary text-left transition-colors"
            >
              <span className="text-xs text-white/70">Hello, sign in</span>
              <span className="font-semibold">Account & Lists</span>
            </button>
          )}

          {/* Orders */}
          <button
            onClick={() => handleNav("/view-order")}
            className="hidden md:flex flex-col text-sm hover:text-secondary text-left transition-colors"
          >
            <span className="text-xs text-white/70">Returns</span>
            <span className="font-semibold">& Orders</span>
          </button>

          {/* Cart */}
          <button
            onClick={() => handleNav("/cart")}
            className="relative flex items-center gap-2 hover:text-secondary transition-colors p-2 -m-2"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:block font-semibold text-sm">Cart</span>
          </button>

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="hidden md:block hover:text-accent transition-colors p-1"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-sm px-4 py-4 space-y-4 border-t border-white/10">
          {/* Search */}
          <div className="amazon-search flex">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2.5 text-foreground bg-background border-0 focus:outline-none text-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="bg-secondary px-4 py-2.5 hover:bg-secondary/90 transition-colors">
              <Search className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Mobile Links */}
          {!user && (
            <button
              onClick={() => handleNav("/login")}
              className="block w-full text-left hover:text-secondary py-2 transition-colors"
            >
              Sign In
            </button>
          )}
          <button
            onClick={() => handleNav("/products")}
            className="block w-full text-left hover:text-secondary py-2 transition-colors"
          >
            All Products
          </button>
          <button
            onClick={() => handleNav("/view-order")}
            className="block w-full text-left hover:text-secondary py-2 transition-colors"
          >
            My Orders
          </button>
          <button
            onClick={() => handleNav("/cart")}
            className="block w-full text-left hover:text-secondary py-2 transition-colors"
          >
            My Cart
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="block w-full text-left hover:text-accent py-2 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
