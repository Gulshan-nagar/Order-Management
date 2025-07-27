const Product = require("../models/Product");

// @desc Create new product (admin only)
exports.createProduct = async (req, res) => {
  try {
    console.log("Request received to create product");
    console.log("Request body:", req.body);

    const { name, price, stock, description } = req.body;

    if (!name || !price || !stock || !description) {
      console.log("Missing fields in request body");
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({ name, price, stock, description });

    console.log("Product created successfully:", product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error in createProduct:", error.message);
    res.status(500).json({ message: "Server error" });
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

// exports.updateProduct = async (req, res) => {
  //   try {
    //     const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //     if (!product) return res.status(404).json({ message: "Product not found" });
    //     res.json(product);
    //   } catch (error) {
      //     res.status(500).json({ message: "Server error" });
      //   }
      // };
      // @desc Update a product (admin only)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, image } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;

    const updated = await product.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
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
