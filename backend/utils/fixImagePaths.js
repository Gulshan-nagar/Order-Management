const Product = require("../models/Product");
const { normalizeImagePath } = require("./imageUtils");

// Function to fix absolute image paths in database
const fixImagePaths = async () => {
  console.log("🔧 Starting image path migration...");
  
  try {
    const products = await Product.find({});
    console.log(`📊 Found ${products.length} products to check`);
    
    let fixedCount = 0;
    
    for (const product of products) {
      if (product.image) {
        const normalizedPath = normalizeImagePath(product.image);
        if (normalizedPath !== product.image) {
          console.log(`🔧 Fixing product "${product.name}": ${product.image} -> ${normalizedPath}`);
          
          // Use findByIdAndUpdate for better reliability
          await Product.findByIdAndUpdate(product._id, { image: normalizedPath });
          fixedCount++;
        }
      }
    }
    
    console.log(`✅ Migration complete! Fixed ${fixedCount} products`);
    return { success: true, fixedCount };
  } catch (error) {
    console.error("❌ Error during image path migration:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { fixImagePaths };