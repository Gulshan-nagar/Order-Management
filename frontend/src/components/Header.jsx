// src/components/Header.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, MapPin, LogOut } from "lucide-react";
import { StoreContext } from "../context/StoreContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getTotalCartItems, logout } = useContext(StoreContext);

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const cartCount = getTotalCartItems();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNav = (path) => {
    navigate(path);
    setIsMenuOpen(false); // close on mobile
  };

  return (
<header className="bg-[#1f2937] text-white sticky top-0 z-50 shadow-md">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Shop<span className="text-primary">Zone</span>
        </div>

        {/* Location (only desktop) */}
        <div className="hidden md:flex items-center gap-2 text-sm text-white/80">
          <MapPin className="w-4 h-4" />
          <div>
            <div className="text-xs">Deliver to</div>
            <div className="font-medium">India 110001</div>
          </div>
        </div>

        {/* Search bar (desktop only) */}
        <div className="hidden md:block flex-1 mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-1.5 rounded-md">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Account & Orders */}
          {user ? (
            <div className="hidden md:flex flex-col text-sm">
              <span className="font-semibold">Hi, {user.name}</span>
              <button
                onClick={() => handleNav("/view-order")}
                className="hover:text-primary"
              >
                Orders
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNav("/login")}
              className="hidden md:flex flex-col text-sm hover:text-primary"
            >
              <span>Hello, sign in</span>
              <span className="font-medium">Account & Lists</span>
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => handleNav("/cart")}
            className="relative flex items-center gap-1 hover:text-primary"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="hidden md:block font-medium">Cart</span>
          </button>

          {/* Logout (if logged in) */}
          {user && (
            <button onClick={handleLogout} className="hidden md:block">
              <LogOut className="w-5 h-5 hover:text-red-500" />
            </button>
          )}

          {/* Hamburger Menu */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Nav Links (Desktop only) */}
      <div className="hidden md:flex gap-6 bg-secondary/90 px-4 py-2 text-sm max-w-7xl mx-auto">
        <button onClick={() => handleNav("/products")} className="hover:text-primary">
          Today's Deals
        </button>
       <button
  onClick={() => handleNav("/category/Electronics")}
  className="hover:text-primary"
>
  Electronics
</button>

        <button onClick={() => alert("Fashion coming soon")} className="hover:text-primary">
          Fashion
        </button>
        <button onClick={() => alert("Home & Kitchen coming soon")} className="hover:text-primary">
          Home & Kitchen
        </button>
        <button onClick={() => alert("Books coming soon")} className="hover:text-primary">
          Books
        </button>
        <button onClick={() => alert("Sports coming soon")} className="hover:text-primary">
          Sports
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary/95 px-4 py-4 space-y-3">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none mb-2"
          />
          {!user && (
            <button
              onClick={() => handleNav("/login")}
              className="block w-full text-left hover:text-primary"
            >
              Sign In
            </button>
          )}
          <button onClick={() => handleNav("/products")} className="block w-full text-left hover:text-primary">
            All Products
          </button>
       <button onClick={() => navigate("/category/Electronics")}>Electronics</button>


          <button onClick={() => handleNav("/view-order")} className="block w-full text-left hover:text-primary">
            My Orders
          </button>
          <button onClick={() => handleNav("/cart")} className="block w-full text-left hover:text-primary">
            My Cart
          </button>
          {user && (
            <button onClick={handleLogout} className="block w-full text-left hover:text-red-400">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
