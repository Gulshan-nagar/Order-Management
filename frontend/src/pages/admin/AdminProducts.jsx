import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS, BASE_URL } from "../../utils/apiPaths";
import Layout from "../../components/Layout";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.PRODUCTS.GET_ALL);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  const resetForm = () => {
    setFormData({ name: "", price: "", stock: "", category: "", description: "" });
    setEditId(null);
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));
      if (image) form.append("image", image);

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (editId) {
        await axiosInstance.put(API_PATHS.PRODUCTS.UPDATE(editId), form, config);
        alert("✅ Product updated successfully");
      } else {
        await axiosInstance.post(API_PATHS.PRODUCTS.CREATE, form, config);
        alert("✅ Product added successfully");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert("❌ Failed to upload product. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category || "",
      description: product.description || "",
    });
    setImage(null);
    setImagePreview(product.image ? `${BASE_URL}${product.image}` : null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(API_PATHS.PRODUCTS.DELETE(id));
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("❌ Failed to delete product");
    }
  };

  return (
    <Layout>
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        {/* Form Section */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {editId ? "✏️ Edit Product" : "➕ Add Product"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
              <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"></textarea>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="h-32 object-cover rounded-md border" />}
            <div className="flex flex-wrap gap-2">
              <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                {loading ? "Saving..." : editId ? "Update" : "Add"}
              </button>
              {editId && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>}
            </div>
          </form>
        </div>

        {/* Product Table */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md overflow-x-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-800">📦 Product List</h3>
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Category</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    {product.image ? (
                      <img
                        src={`${BASE_URL}${product.image}`}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded-md border"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">₹{product.price}</td>
                  <td className="p-2">{product.stock}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2 flex gap-2 flex-wrap">
                    <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProducts;
