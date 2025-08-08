const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");
const connectDB = require("./config/db");

// Load env variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Add your actual deployed frontend URL here
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000", 
  "http://localhost:8080",
  "https://order-management-1-kt6d.onrender.com",
  "https://id-preview--396da912-d36a-48dd-8743-717f79dca800.lovable.app",
  /.*\.lovable\.app$/,
  /.*\.lovableproject\.com$/
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      
      // Check exact matches
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      
      // Check regex patterns
      const regexPatterns = allowedOrigins.filter(pattern => pattern instanceof RegExp);
      if (regexPatterns.some(pattern => pattern.test(origin))) {
        callback(null, true);
        return;
      }
      
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced static file handling with proper headers
app.use("/uploads", (req, res, next) => {
  // Set proper headers for images
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(__dirname, "uploads"), {
  maxAge: '1d', // Cache for 1 day
  etag: true,
  lastModified: true
}));

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/healthz", (req, res) => res.send("✅ Server is healthy"));

// ✅ Socket.IO setup with proper config
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket'], // ✅ Important for Render
});

// Track connected users
let connectedUsers = {};

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("register-user", (userId) => {
    connectedUsers[userId] = socket.id;
    console.log(`📱 User registered: ${userId} -> ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
    for (let userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  });
});

// Export io globally
module.exports.io = io;

// Start server after DB connection
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
