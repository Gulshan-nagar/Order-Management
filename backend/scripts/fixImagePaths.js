// scripts/fixImagePaths.js
const mongoose = require("mongoose");
const Product = require("../models/Product");

const MONGO_URI = "mongodb+srv://gulshannagar5525:fQUvHgMtnto3FEZ7@cluster0.8imnpra.mongodb.net/order-management?retryWrites=true&w=majority"; 

const runFix = async () => {
  await mongoose.connect(MONGO_URI);
  const products = await Product.find();

  let fixedCount = 0;

  for (const product of products) {
    let image = product.image;
    if (!image) continue;

    let filename = image.split("/").pop();
    let cleanPath = `uploads/${filename}`;

    if (image !== cleanPath) {
      await Product.findByIdAndUpdate(product._id, { image: cleanPath });
      fixedCount++;
      console.log(`✅ Fixed image for ${product.name}: ${cleanPath}`);
    }
  }

  console.log(`🎉 Done. Total fixed: ${fixedCount}`);
  mongoose.disconnect();
};

runFix();