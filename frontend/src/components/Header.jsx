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
    <header className="bg-[#1f2937] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer hover:text-orange-500 transition"
          onClick={() => handleNav("/products")}
        >
          Shop<span className="text-orange-500">Zone</span>
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-2 text-sm text-white/80">
          <MapPin className="w-4 h-4" />
          <div>
            <div className="text-xs">Deliver to</div>
            <div className="font-medium">India 110001</div>
          </div>
        </div>

        {/* Search (Desktop) */}
        <div className="hidden md:block flex-1 mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border-2 border-primary/20 focus:border-orange-500 focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-1.5 rounded-md">
              <Search className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex flex-col text-sm cursor-pointer">
              <span className="font-semibold">Hi, {user.name}</span>
              <button
                onClick={() => handleNav("/view-order")}
                className="hover:text-orange-400 text-left"
              >
                Orders
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNav("/login")}
              className="hidden md:flex flex-col text-sm hover:text-orange-400 text-left"
            >
              <span>Hello, sign in</span>
              <span className="font-medium">Account & Lists</span>
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => handleNav("/cart")}
            className="relative flex items-center gap-1 hover:text-orange-400"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="hidden md:block font-medium">Cart</span>
          </button>

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="hidden md:block hover:text-red-400"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border-2 border-orange-400 focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute right-2 top-[9px] bg-orange-500 text-white p-1.5 rounded-md">
              <Search className="w-4 h-4" />
            </div>
          </div>

          {/* Mobile Links */}
          {!user && (
            <button
              onClick={() => handleNav("/login")}
              className="block w-full text-left hover:text-orange-400"
            >
              Sign In
            </button>
          )}
          <button
            onClick={() => handleNav("/products")}
            className="block w-full text-left hover:text-orange-400"
          >
            All Products
          </button>
          <button
            onClick={() => handleNav("/view-order")}
            className="block w-full text-left hover:text-orange-400"
          >
            My Orders
          </button>
          <button
            onClick={() => handleNav("/cart")}
            className="block w-full text-left hover:text-orange-400"
          >
            My Cart
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="block w-full text-left hover:text-red-400"
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
