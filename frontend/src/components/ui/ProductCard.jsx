const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white p-4 rounded-2xl shadow hover:shadow-xl border">
    {product.image && (
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-3"
      />
    )}
    <h3 className="text-xl font-semibold">{product.name}</h3>
    <p className="text-green-600 font-bold">₹{product.price}</p>
    <p className="text-sm text-gray-500">In stock: {product.stock}</p>
    <button
      onClick={() => onAddToCart(product)}
      className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
      ➕ Add to Cart
    </button>
  </div>
);

export default ProductCard;
