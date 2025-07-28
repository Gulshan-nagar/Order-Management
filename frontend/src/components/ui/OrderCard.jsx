const OrderCard = ({ order }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex justify-between">
      <div>
        <p className="font-semibold">Order ID: {order._id}</p>
        <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
      </div>
      <OrderStatusBadge status={order.status} />
    </div>
    <div className="mt-3 space-y-2">
      {order.items.map((item) => (
        <div key={item._id} className="text-sm flex justify-between">
          <span>{item.product.name} (x{item.quantity})</span>
          <span>₹{item.product.price * item.quantity}</span>
        </div>
      ))}
    </div>
    <p className="text-right mt-2 font-bold">Total: ₹{order.totalPrice}</p>
  </div>
);

export default OrderCard;
