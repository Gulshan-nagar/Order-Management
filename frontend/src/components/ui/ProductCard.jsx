import Image from "./Image";
import { Star, Heart } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => (
  <div className="group amazon-card hover-lift w-full max-w-[280px] bg-card rounded-lg overflow-hidden mx-auto shadow-md hover:shadow-lg transition-shadow">
    {/* Product Image */}
    <div className="relative overflow-hidden bg-muted/30">
      <Image
        src={product.image}
        alt={product.name}
        category={product.category}
        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        width={280}
        height={208}
        lazy={true}
      />

      {/* Favorite Button */}
      <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-card/95 hover:bg-card p-2 rounded-full shadow">
        <Heart className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
      </button>

      {/* Discount Badge */}
      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold shadow">
        17% OFF
      </div>
    </div>

    {/* Product Info */}
    <div className="p-4 space-y-3">
      {/* Brand */}
      <div className="text-xs text-muted-foreground font-medium">
        Brand Store
      </div>

      {/* Name */}
      <h3 className="text-sm font-medium text-card-foreground line-clamp-2 leading-snug hover:text-primary transition-colors">
        {product.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < 4
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">(127)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-card-foreground">
          ₹{product.price}
        </span>
        <span className="text-sm text-muted-foreground line-through">
          ₹{Math.round(product.price * 1.2)}
        </span>
      </div>

      {/* Delivery Info */}
      <div className="text-xs text-green-600 font-medium">
        FREE Delivery by Tomorrow
      </div>
    </div>

    {/* Add to Cart Button */}
    <div className="px-4 pb-4">
      <button
        onClick={() => onAddToCart(product._id)}
        disabled={product.stock === 0}
        className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
          product.stock === 0
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-yellow-400 hover:bg-yellow-500 active:scale-95"
        }`}
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  </div>
);

export default ProductCard;
