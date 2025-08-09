import React from 'react';
import { Calendar, Package, MapPin } from 'lucide-react';
import Image from './Image';

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'confirmed':
        return 'bg-primary text-primary-foreground';
      case 'preparing':
        return 'bg-secondary text-secondary-foreground';
      case 'out for delivery':
        return 'bg-accent text-accent-foreground';
      case 'delivered':
        return 'bg-success text-success-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="group amazon-card shadow-premium hover:shadow-amazon transition-all duration-300 overflow-hidden">
      {/* Order Header */}
      <div className="bg-muted/30 p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">Order #{order._id?.slice(-8)}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(order.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
              {order.status || 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6">
        <div className="space-y-4">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg border border-border/50">
              {item.product ? (
                <>
                  <div className="flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      className="w-20 h-20 object-cover rounded-lg"
                      width={80}
                      height={80}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-base line-clamp-2">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span>₹{item.product.price} × {item.quantity}</span>
                      <span className="font-bold text-primary text-base">
                        = ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                    <div className="free-delivery mt-2">
                      FREE Delivery
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3 text-destructive">
                  <Package className="w-5 h-5" />
                  <span className="text-sm">Product no longer available</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-base">Total Amount</span>
            <span className="text-2xl font-bold text-foreground">
              ₹{order.totalPrice || order.items?.reduce((total, item) => 
                total + (item.product?.price || 0) * item.quantity, 0
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;