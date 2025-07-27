const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getUserOrders,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/user", protect, getUserOrders); 


// Customer: Place order
router.post("/", protect, createOrder);

// Customer/Admin: View specific order
router.get("/:id", protect, getOrderById);

// Admin: Get all orders
router.get("/", protect, adminOnly, getAllOrders);

// Admin: Update order status
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;


