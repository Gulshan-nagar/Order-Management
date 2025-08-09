import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from './button';
import Image from './Image';

const CartCard = ({ product, quantity, onIncrease, onDecrease, onRemove }) => {
  const itemTotal = product.price * quantity;

  return (
    <div className="group amazon-card p-4 hover:shadow-amazon transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            category={product.category}
            className="w-24 h-24 object-cover rounded-lg"
            width={96}
            height={96}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-card-foreground text-base line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-primary font-bold text-xl mt-2">₹{product.price}</p>
          {product.category && (
            <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md mt-2">
              {product.category}
            </span>
          )}
          <div className="free-delivery mt-2">
            FREE Delivery
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-2">
          <button
            onClick={onDecrease}
            className="w-8 h-8 rounded-full border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="font-bold text-foreground min-w-[2rem] text-center">
            {quantity}
          </span>
          
          <button
            onClick={onIncrease}
            className="w-8 h-8 rounded-full border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Item Total & Remove */}
        <div className="flex flex-col items-end gap-3">
          <p className="font-bold text-xl text-foreground">
            ₹{itemTotal}
          </p>
          
          <button
            onClick={onRemove}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;