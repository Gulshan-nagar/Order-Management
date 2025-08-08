const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads/");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📁 Upload destination set to:", uploadsDir);
    console.log("🌐 Request source (uploadMiddleware):", req.get('User-Agent'));
    console.log("📤 File being uploaded:", file.originalname);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    
    console.log("📝 Generated filename:", filename);
    console.log("📝 File will be stored as relative path: uploads/" + filename);
    console.log("🔧 Full file path will be:", path.join(uploadsDir, filename));
    cb(null, filename);
  },
});

// Enhanced file filter with detailed logging
const fileFilter = (req, file, cb) => {
  console.log("🔍 File filter checking:", {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size
  });

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  
  if (allowedTypes.includes(file.mimetype)) {
    console.log("✅ File type approved:", file.mimetype);
    cb(null, true);
  } else {
    console.log("❌ File type rejected:", file.mimetype);
    cb(new Error(`Only ${allowedTypes.join(', ')} formats are allowed`), false);
  }
};

// Initialize multer with enhanced configuration
const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024, // Max 5MB
    files: 1 // Only one file at a time
  },
  onError: (err, next) => {
    console.error("❌ Multer error:", err);
    next(err);
  }
});

module.exports = upload;