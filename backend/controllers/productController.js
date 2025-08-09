const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const { fixImagePaths } = require("../utils/fixImagePaths");
const { normalizeImagePath, validateImageFile } = require("../utils/imageUtils");

// @desc Create new product (admin only)





// Create Product
// Corrected Create Product
exports.createProduct = async (req, res) => {

  
  try {
    const { name, price, stock, description, category } = req.body;

    if (!name || !price || !stock || !description || !category) {
      console.log("❌ Backend: Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    let image = "";
    if (req.file) {
      // Validate file
      const validation = validateImageFile(req.file);
      if (!validation.valid) {
        console.log("❌ Backend: File validation failed:", validation.error);
        return res.status(400).json({ error: validation.error });
      }

      // Use consistent relative path format
      const filename = req.file.filename;
      image = normalizeImagePath(`uploads/${filename}`);
    
    } else {
      console.log("⚠️ Backend: No file received in req.file");
    }

    const product = new Product({
      name,
      price: Number(price),
      stock: Number(stock), 
      description,
      category,
      image,
      createdBy: req.user._id,
    });

    const saved = await product.save();
    console.log("✅ Backend: Product created successfully with image:", saved.image);
    
    // Verify the saved product in database
    const verification = await Product.findById(saved._id);
    console.log("🔍 Backend: Verification check - saved image path:", verification.image);
    
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
   
    
    // Normalize ALL image paths using the utility function
    let fixedCount = 0;
    for (const product of products) {
      if (product.image) {
        const normalizedPath = normalizeImagePath(product.image);
        if (normalizedPath !== product.image) {
          console.log("🔧 Backend: Normalizing path for product:", product.name, "Old:", product.image, "New:", normalizedPath);
          // Update in database permanently
          await Product.findByIdAndUpdate(product._id, { image: normalizedPath });
          product.image = normalizedPath; // Update local object too
          fixedCount++;
        }
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
exports.updateProduct = async (req, res) => {
  
  try {
    const { name, price, description, stock, category } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      console.log("❌ Backend: Product not found with ID:", id);
      return res.status(404).json({ message: "Product not found" });
    }


    // Update fields with proper type conversion
    if (name !== undefined && name !== "") {
      product.name = name;
    }
    if (price !== undefined && price !== "") {
      product.price = Number(price);
    }
    if (description !== undefined && description !== "") {
      product.description = description;
    }
    if (stock !== undefined && stock !== "") {
      product.stock = Number(stock);
    }
    if (category !== undefined && category !== "") {
      product.category = category;
    }

    // Update image only if new image is uploaded
    if (req.file && req.file.filename) {
      // Validate file
      const validation = validateImageFile(req.file);
      if (!validation.valid) {
        console.log("❌ Backend: File validation failed:", validation.error);
        return res.status(400).json({ error: validation.error });
      }

      // Use consistent relative path format
      const filename = req.file.filename;
      const newImagePath = normalizeImagePath(`uploads/${filename}`);
      product.image = newImagePath;
    }

    const updatedProduct = await product.save();

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

