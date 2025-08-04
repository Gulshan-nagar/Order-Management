// backend/middleware/uploadMiddleware.js
const multer = require("multer");
const { storage } = require("../config/cloudinary");

// Optional: File size limit (same as before)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
