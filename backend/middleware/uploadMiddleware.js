const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads/");
        console.log("📁 Upload destination set to:", uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        console.log("📝 Generated filename:", filename);
        console.log("📝 File will be stored as relative path: uploads/" + filename);
        cb(null, filename);
    },
});

// File filter with logging
const fileFilter = (req, file, cb) => {
    console.log("Received file type:", file.mimetype); // Debugging log
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpeg, .jpg and .png formats are allowed"), false);
    }
};

// Initialize multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
});

module.exports = upload;
