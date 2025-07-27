const Product = require("../models/Product");

// @desc Create new product (admin only)
// Assuming: Product has 'image' field
exports.createProduct = async (req, res) => {
  try {
    console.log("➡️ req.body:", req.body);
    console.log("➡️ req.file:", req.file); // 👈 Check if file is received

    const { name, price, description, stock } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      name,
      price,
      stock,
      description,
      image: req.file ? req.file.filename : "",
      createdBy: req.user._id,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Create product error:", error.message);
    res.status(500).json({ message: "Failed to create product" });
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

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields from request body
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    product.description = req.body.description || product.description;

    // 👇 Image update if file is uploaded
    if (req.file) {
      product.image = req.file.filename;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
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
