const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
// backend/server.js
const path = require("path");


// Import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { protect, adminOnly } = require("./middleware/authMiddleware");

// Load environment variables
dotenv.config();

// Create Express app & HTTP server
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/healthz", (req, res) => res.send("Server is healthy ✅"));

// SOCKET.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // allow all for dev
    methods: ["GET", "POST"],
  },
});

// Store connected users
let connectedUsers = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Register user
  socket.on("register-user", (userId) => {
    connectedUsers[userId] = socket.id;
    console.log(`User registered: ${userId} -> ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (let key in connectedUsers) {
      if (connectedUsers[key] === socket.id) {
        delete connectedUsers[key];
        break;
      }
    }
  });
});

// ✅ These are already available in CommonJS:
console.log(__dirname); // current directory
console.log(__filename); // 
// Make io available for other files (like controllers)
module.exports.io = io;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server after DB connects
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
