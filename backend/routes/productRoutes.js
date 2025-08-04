// backend/routes/product.js
const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  bulkCreateProducts,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ Cloudinary-based multer

// Public: Get all products
router.get("/", getAllProducts);

// Protected: Admin only routes
router.post("/", protect, adminOnly, upload.single("image"), createProduct); // ✅ Upload to Cloudinary
router.post("/bulk", protect, adminOnly, bulkCreateProducts);
router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
