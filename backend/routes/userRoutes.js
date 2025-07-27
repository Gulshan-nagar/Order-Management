const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// @route   POST /api/users/register
// @desc    Register new user
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login user
router.post("/login", loginUser);

router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);
router.put("/:id", protect, adminOnly, updateUser);
module.exports = router;
