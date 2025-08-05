const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
// @desc Create new product (admin only)

// Setup Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "products",
  });
  fs.unlinkSync(filePath); // remove local file after upload
  return result.secure_url;
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.path);
    }

    const product = new Product({
      name,
      price,
      stock,
      description,
      category,
      image: imageUrl,
      createdBy: req.user._id,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Create product error:", error.message);
    res.status(500).json({ message: "Failed to create product" });
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
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

      // @desc Update a product (admin only)
// controllers/productController.js
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Pehle product ko find karo
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};






// @desc Delete a product (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
