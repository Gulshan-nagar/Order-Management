import { getImageUrl } from "../../utils/getImageUrl";
import { Star, ShoppingCart, Heart } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => (
  <div className="amazon-card hover-lift group">
    <div className="relative overflow-hidden rounded-lg mb-3">
      {product.image && (
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/80 hover:bg-white p-2 rounded-full shadow-md">
        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>
      {product.stock <= 5 && product.stock > 0 && (
        <div className="absolute top-3 left-3 bg-warning text-warning-foreground px-2 py-1 rounded-md text-xs font-medium">
          Only {product.stock} left
        </div>
      )}
    </div>
    
    <div className="space-y-2">
      <h3 className="text-base font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3 h-3 ${i < 4 ? 'text-accent fill-accent' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">(127)</span>
      </div>
      
      <div className="flex items-baseline gap-2">
        <p className="text-xl font-bold text-primary">₹{product.price}</p>
        <p className="text-sm text-muted-foreground line-through">₹{Math.round(product.price * 1.2)}</p>
        <span className="text-xs text-success font-medium">(17% off)</span>
      </div>
      
      {product.description && (
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      )}
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="bg-success/10 text-success px-2 py-1 rounded">FREE Delivery</span>
        <span>by Tomorrow</span>
      </div>
    </div>
    
    <button
      onClick={() => onAddToCart(product._id)}
      disabled={product.stock === 0}
      className={`mt-4 w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
        product.stock === 0
          ? "bg-muted text-muted-foreground cursor-not-allowed"
          : "amazon-button hover:shadow-lg active:scale-[0.98]"
      }`}
    >
      {product.stock === 0 ? (
        "Out of Stock"
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </>
      )}
    </button>
  </div>
);

export default ProductCard;
