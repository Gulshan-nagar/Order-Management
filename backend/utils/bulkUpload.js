const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const csvFilePath = path.join(__dirname, "../products.csv");

const bulkUploadProducts = async () => {
  const products = [];

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (row) => {
  const imagePath = `http://localhost:5000/uploads/${row.image}`;
      products.push({
        name: row.name,
        price: row.price,
        stock: row.stock,
        category: row.category,
        description: row.description,
        image: imagePath, // ✅ Now stores the correct path
      });
    })
    .on("end", async () => {
      try {
        await Product.insertMany(products);
        console.log("Products added successfully!");
        process.exit(0);
      } catch (error) {
        console.error("Error inserting products:", error);
        process.exit(1);
      }
    });
};

bulkUploadProducts();
