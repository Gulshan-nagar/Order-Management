const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ✅ Import multer middleware

// Public: Get all products
router.get("/", getAllProducts);

// Protected: Admin only routes
router.post("/", protect, adminOnly, upload.single("image"), createProduct); // ✅ Add image upload here
router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
