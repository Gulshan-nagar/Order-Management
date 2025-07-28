const Order = require("../models/Order");
const Product = require("../models/Product");
const { io } = require("../server");

// In-memory store from server.js (optional export if needed)
const { connectedUsers } = require("../server");

// 🔔 Emit order status update to specific user
const emitOrderStatus = (order) => {
  if (order && order.user) {
    const userId = order.user.toString();
    const socketId = connectedUsers?.[userId];
    if (socketId) {
      io.to(socketId).emit("order-status-updated", order);
      console.log(`✅ Order status emitted to user ${userId}`);
    }
  }
};

// @desc Create a new order (customer)
// @route POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items to order" });
    }

    // 🔸 Calculate total price
    let totalPrice = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      totalPrice += product.price * item.quantity;
    }

    // 🔸 Create order with totalPrice
    const newOrder = new Order({
      user: req.user._id,
      items,
      totalPrice,
      status: "PLACED",
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Error in createOrder:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc Get all orders (admin only)
// @route GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price image");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get single order (customer)
// @route GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email ")
      .populate("items.product", "name price image");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Check access
    if (req.user.role !== "admin" && !order.user._id.equals(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update order status (admin only)
// @route PUT /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatus = ["PLACED", "PICKED", "SHIPPED", "DELIVERED", "REJECTED"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    emitOrderStatus(order); // 🔔 Emit update to client

    res.json(order);
  } catch (error) {
    console.error("❌ Error in updateOrderStatus:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc Get current user's orders
// @route GET /api/orders/user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name price image");

    res.json(orders);
  } catch (error) {
    console.error("❌ Error in getUserOrders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

