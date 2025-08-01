// Updated Products.jsx with better mobile responsiveness and improved visuals
import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import ProductCard from "../components/ui/ProductCard";
import { Filter, Grid, List, SortAsc } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const Products = () => {
  const { products, loading, addToCart } = useContext(StoreContext);
  const { searchQuery } = useOutletContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    "All",
    "Food",
    "Electronics & Gadgets",
    "Fashion & Apparel",
    "Home & Kitchen",
    "Health & Personal Care",
    "Groceries & Essentials",
    "Beauty & Cosmetics",
    "Books & Stationery",
    "Toys & Baby Products",
    "Sports & Outdoors",
  ];

  const categorizedProducts = products.map((p) => ({
    ...p,
    category: p.category || "Food",
  }));

  const filteredProducts = categorizedProducts.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <p className="text-lg font-medium text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Explore Our Products
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Browse top-quality items at great prices
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 md:flex-row justify-between mb-8">
          {/* Filters */}
          <div className="overflow-x-auto -mx-2 px-2">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600 shrink-0" />
              <span className="font-medium text-gray-700 shrink-0">Filter:</span>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-full border transition-all ${
                      selectedCategory === category
                        ? "bg-orange-600 text-white border-orange-600 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sort & View */}
          <div className="flex flex-wrap items-center gap-3 justify-end">
            <div className="flex items-center gap-2">
              <SortAsc className="w-5 h-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-orange-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg border ${
                  viewMode === "grid"
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg border ${
                  viewMode === "list"
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid/List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "space-y-4"
          }`}
        >
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={addToCart}
                viewMode={viewMode}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4 text-gray-300">😕</div>
              <h2 className="text-xl font-semibold text-gray-700">No products found</h2>
              <p className="text-gray-500">
                {selectedCategory === "All" && searchQuery === ""
                  ? "We're currently out of products."
                  : `No items found for "${searchQuery}" in "${selectedCategory}".`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
