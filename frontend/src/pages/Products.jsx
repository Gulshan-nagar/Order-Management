import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import ProductCard from "../components/ui/ProductCard";
import { Filter, Grid, List, SortAsc, Search } from "lucide-react";
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

  const filteredProducts = (products || []).filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category?.toLowerCase() === selectedCategory.toLowerCase();
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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          
          
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-6 bg-card border border-border rounded-lg p-4 shadow-sm">
          {/* Filters */}
          <div className="overflow-x-auto">
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-full border transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sort & View */}
          <div className="flex items-center gap-3 justify-end">
            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent bg-background text-foreground"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "space-y-4"
          }
        >
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product._id} className="flex justify-center">
                <ProductCard product={product} onAddToCart={addToCart} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted/50 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                No products found
              </h2>
              <p className="text-muted-foreground">
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
