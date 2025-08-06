import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import { getImageUrl } from "../../utils/getImageUrl"; // ✅ Make sure this exists

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      console.log("🔍 AdminProducts: Fetching products...");
      const res = await axiosInstance.get(API_PATHS.PRODUCTS.GET_ALL);
      console.log("✅ AdminProducts: Products fetched:", res.data);
      console.log("🖼️ AdminProducts: Image paths check:", res.data.map(p => ({ name: p.name, image: p.image })));
      setProducts(res.data);
    } catch (error) {
      console.error("❌ AdminProducts: Error fetching products:", error);
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
    setFormData({
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
    });
    setImage(null);
    setImagePreview(null);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("🚀 AdminProducts: Starting submit for", editId ? "UPDATE" : "CREATE");
    console.log("📝 AdminProducts: Form data:", formData);
    console.log("🖼️ AdminProducts: Image file:", image);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`📋 AdminProducts: Adding to FormData - ${key}:`, value);
      form.append(key, value);
    });
    if (image) {
      console.log("📎 AdminProducts: Adding image to FormData:", image.name);
      form.append("image", image);
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      let response;
      if (editId) {
        console.log("🔄 AdminProducts: Updating product with ID:", editId);
        response = await axiosInstance.put(API_PATHS.PRODUCTS.UPDATE(editId), form, config);
        console.log("✅ AdminProducts: Update response:", response.data);
        toast.success("Product updated successfully");
      } else {
        console.log("➕ AdminProducts: Creating new product");
        response = await axiosInstance.post(API_PATHS.PRODUCTS.CREATE, form, config);
        console.log("✅ AdminProducts: Create response:", response.data);
        toast.success("Product added successfully");
      }

      resetForm();
      await fetchProducts(); // Refetch to see changes immediately
    } catch (error) {
      console.error("❌ AdminProducts: Submit error:", error.response?.data || error.message);
      console.error("❌ AdminProducts: Full error:", error);
      toast.error("Failed to submit product");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    console.log("✏️ AdminProducts: Editing product:", product);
    console.log("🖼️ AdminProducts: Current image path:", product.image);
    console.log("🔗 AdminProducts: Generated image URL:", product.image ? getImageUrl(product.image) : "No image");
    
    setEditId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category || "",
      description: product.description || "",
    });
    setImage(null);
    setImagePreview(product.image ? getImageUrl(product.image) : null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(API_PATHS.PRODUCTS.DELETE(id));
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleFixImagePaths = async () => {
    if (!window.confirm("Fix all absolute image paths in the database?")) return;
    try {
      console.log("🔧 AdminProducts: Starting image path migration...");
      const response = await axiosInstance.post("/api/products/fix-image-paths");
      console.log("✅ AdminProducts: Migration result:", response.data);
      toast.success(`Fixed ${response.data.fixedCount} products`);
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error("❌ AdminProducts: Migration error:", error);
      toast.error("Failed to fix image paths");
    }
  };

  return (
    <Layout>
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen space-y-10">
        {/* Product Form */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {editId ? "✏️ Edit Product" : "➕ Add Product"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="col-span-full px-4 py-2 border rounded-lg" />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="px-4 py-2 border rounded-lg" />
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="px-4 py-2 border rounded-lg" />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="col-span-full px-4 py-2 border rounded-lg" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="col-span-full px-4 py-2 border rounded-lg" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="col-span-full" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="h-32 w-auto object-cover rounded-md border col-span-full" />}
            <div className="col-span-full flex flex-wrap gap-2">
              <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                {loading ? "Saving..." : editId ? "Update" : "Add"}
              </button>
              {editId && (
                <button type="button" onClick={resetForm} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product Table */}
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">📦 Product List</h3>
            <button 
              onClick={handleFixImagePaths}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              🔧 Fix Image Paths
            </button>
          </div>
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
                     <img src={getImageUrl(product.image)} alt={product.name} className="h-16 w-16 object-cover rounded-md border" />
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
