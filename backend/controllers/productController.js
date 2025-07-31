const Product = require("../models/Product");

// @desc Create new product (admin only)
exports.createProduct = async (req, res) => {
  try {
    console.log("Received file:", req.file);
    console.log("Body:", req.body);

    const { name, price, description, stock, category } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      name,
      price,
      stock,
      description,
      category,
      image: imagePath,
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


    // Check for new image
    
     // Update fields
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    
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
