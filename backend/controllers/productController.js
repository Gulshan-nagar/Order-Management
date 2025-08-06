const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const { fixImagePaths } = require("../utils/fixImagePaths");

// @desc Create new product (admin only)





// Create Product
// Corrected Create Product
exports.createProduct = async (req, res) => {
  console.log("🚀 Backend: CREATE PRODUCT started");
  console.log("📝 Backend: req.body:", req.body);
  console.log("🖼️ Backend: req.file:", req.file);
  
  try {
    const { name, price, stock, description, category } = req.body;

    if (!name || !price || !stock || !description || !category) {
      console.log("❌ Backend: Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    let image = "";
    if (req.file) {
      // Ensure ONLY filename is used, strip any absolute path
      const filename = req.file.filename || req.file.originalname;
      image = `uploads/${filename}`;
      console.log("📎 Backend: Image path set to (relative):", image);
      console.log("📎 Backend: req.file.path was:", req.file.path);
    }

    const product = new Product({
      name,
      price,
      stock,
      description,
      category,
      image,
      createdBy: req.user._id,
    });

    console.log("💾 Backend: Saving product:", product);
    const saved = await product.save();
    console.log("✅ Backend: Product created successfully:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Backend: Create product error:", err);
    res.status(500).json({ error: "Server error while creating product" });
  }
};





// @desc Bulk create products (admin only)
exports.bulkCreateProducts = async (req, res) => {
  try {
    const products = req.body.products;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No product data provided" });
    }

    const productsWithUser = products.map((p) => ({
      ...p,
      createdBy: req.user._id,
    }));

    const savedProducts = await Product.insertMany(productsWithUser);
    res.status(201).json(savedProducts);
  } catch (error) {
    console.error("Bulk product creation error:", error);
    res.status(500).json({ message: "Failed to bulk create products" });
  }
};






// @desc Get all products
exports.getAllProducts = async (req, res) => {
  console.log("🔍 Backend: GET ALL PRODUCTS started");
  try {
    const products = await Product.find();
    console.log("✅ Backend: Found products:", products.length);
    console.log("🖼️ Backend: Image paths in products:", products.map(p => ({ name: p.name, image: p.image })));
    
    // Fix any absolute paths to relative paths and SAVE them permanently
    let fixedCount = 0;
    for (const product of products) {
      if (product.image && product.image.includes('/opt/render/project/src/backend/uploads/')) {
        const filename = product.image.split('/').pop();
        const newPath = `uploads/${filename}`;
        console.log("🔧 Backend: Fixing and saving absolute path for product:", product.name, "Old:", product.image, "New:", newPath);
        
        // Update in database permanently
        await Product.findByIdAndUpdate(product._id, { image: newPath });
        product.image = newPath; // Update local object too
        fixedCount++;
      }
    }
    
    if (fixedCount > 0) {
      console.log(`✅ Backend: Permanently fixed ${fixedCount} image paths in database`);
    }
    
    res.json(products);
  } catch (error) {
    console.error("❌ Backend: Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

      // @desc Update a product (admin only)
// controllers/productController.js
// @desc Update a product (admin only)
exports.updateProduct = async (req, res) => {
  console.log("🔥 Backend: UPDATE PRODUCT started");
  console.log("📝 Backend: req.body:", req.body);
  console.log("🖼️ Backend: req.file:", req.file);
  console.log("🆔 Backend: req.params.id:", req.params.id);

  try {
    const { name, price, description, stock, category } = req.body;
    const { id } = req.params;

    console.log("🔍 Backend: Finding product with ID:", id);
    const product = await Product.findById(id);

    if (!product) {
      console.log("❌ Backend: Product not found with ID:", id);
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("📄 Backend: Current product before update:", product);

    // Update fields - ensure we update even if values are provided
    if (name !== undefined && name !== "") {
      console.log("📝 Backend: Updating name from", product.name, "to", name);
      product.name = name;
    }
    if (price !== undefined && price !== "") {
      console.log("💰 Backend: Updating price from", product.price, "to", price);
      product.price = price;
    }
    if (description !== undefined && description !== "") {
      console.log("📄 Backend: Updating description from", product.description, "to", description);
      product.description = description;
    }
    if (stock !== undefined && stock !== "") {
      console.log("📦 Backend: Updating stock from", product.stock, "to", stock);
      product.stock = stock;
    }
    if (category !== undefined && category !== "") {
      console.log("🏷️ Backend: Updating category from", product.category, "to", category);
      product.category = category;
    }

    // Update image only if new image is uploaded
    if (req.file && req.file.filename) {
      // Ensure ONLY filename is used, strip any absolute path
      const filename = req.file.filename || req.file.originalname;
      const newImagePath = `uploads/${filename}`;
      console.log("🖼️ Backend: Updating image from", product.image, "to", newImagePath);
      console.log("🖼️ Backend: req.file.path was:", req.file.path);
      product.image = newImagePath;
    }

    console.log("💾 Backend: Saving updated product:", product);
    const updatedProduct = await product.save();

    console.log("✅ Backend: Product updated successfully:", updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("❌ Backend: Product update error:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};







// @desc Delete a product (admin only)
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne(); // More explicit than findByIdAndDelete
  res.json({ message: "Product deleted successfully" });
});

// @desc Fix image paths migration (admin only)
exports.fixImagePaths = async (req, res) => {
  try {
    console.log("🔧 Manual migration triggered");
    const result = await fixImagePaths();
    res.json(result);
  } catch (error) {
    console.error("❌ Migration error:", error);
    res.status(500).json({ message: "Migration failed", error: error.message });
  }
};

