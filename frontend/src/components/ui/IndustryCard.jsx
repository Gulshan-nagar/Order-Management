import React from "react";
import { Star, ShoppingCart, Heart, Truck, Shield } from "lucide-react";
import { EnhancedButton } from "./enhanced-button";
import Image from "./Image";

const IndustryCard = ({ product, onAddToCart, onToggleFavorite, isFavorite = false }) => {
  const discount = Math.round((1 - product.price / (product.price * 1.2)) * 100);
  
  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-amazon transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background to-muted/30">
        <Image
          src={product.image}
          alt={product.name}
          category={product.category}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          width={300}
          height={224}
          lazy={true}
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button 
          onClick={() => onToggleFavorite?.(product._id)}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg backdrop-blur-sm"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'}`} />
        </button>
        
        {/* Stock Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-4 left-4 bg-warning text-warning-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            Only {product.stock} left!
          </div>
        )}
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-14 left-4 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            {discount}% OFF
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < 4 ? 'text-accent fill-accent' : 'text-muted-foreground'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">(127 reviews)</span>
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          <span className="text-base text-muted-foreground line-through">₹{Math.round(product.price * 1.2)}</span>
        </div>
        
        {/* Description */}
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        
        {/* Delivery Info */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-success">
            <Truck className="w-3.5 h-3.5" />
            <span className="font-medium">FREE Delivery</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure Payment</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-5 pt-0">
        <EnhancedButton
          onClick={() => onAddToCart(product._id)}
          disabled={product.stock === 0}
          variant={product.stock === 0 ? "outline" : "cart"}
          size="cart"
          className="w-full"
        >
          {product.stock === 0 ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </EnhancedButton>
      </div>
    </div>
  );
};

export default IndustryCard;