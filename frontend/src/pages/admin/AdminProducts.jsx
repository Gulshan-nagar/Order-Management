import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Layout from "../../components/Layout";
// import { getImageUrl } from "../../utils/getImageUrl"; 


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
    setImagePreview(file ? URL.createObjectURL(file) : null);
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

    if (editId) {
      await axiosInstance.put(API_PATHS.PRODUCTS.UPDATE(editId), form);
      alert("✅ Product updated successfully");
    } else {
      await axiosInstance.post(API_PATHS.PRODUCTS.CREATE, form);
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
setImagePreview(product.image ? `${product.image}` : null); // just in case
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
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen space-y-10">
        {/* Form Section */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {editId ? "✏️ Edit Product" : "➕ Add Product"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required className="col-span-full px-4 py-2 border rounded-lg" />
            <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} required className="px-4 py-2 border rounded-lg" />
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="px-4 py-2 border rounded-lg" />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="col-span-full px-4 py-2 border rounded-lg" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="col-span-full px-4 py-2 border rounded-lg"></textarea>
            <input type="file" accept="image/*" onChange={handleImageChange} className="col-span-full" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="h-32 w-auto object-cover rounded-md border col-span-full" />}
            <div className="col-span-full flex flex-wrap gap-2">
              <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                {loading ? "Saving..." : editId ? "Update" : "Add"}
              </button>
              {editId && <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Cancel</button>}
            </div>
          </form>
        </div>

        {/* Product Table */}
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📦 Product List</h3>
          <table className="min-w-full border text-sm text-left">
            <thead>
              <tr className="bg-gray-200">
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
                     <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded-md border" />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="p-2 font-medium text-gray-800">{product.name}</td>
                  <td className="p-2 text-gray-600">₹{product.price}</td>
                  <td className="p-2 text-gray-600">{product.stock}</td>
                  <td className="p-2 text-gray-600">{product.category}</td>
                  <td className="p-2 flex gap-2 flex-wrap">
                    <button onClick={() => handleEdit(product)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No products found.
                  </td>
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
