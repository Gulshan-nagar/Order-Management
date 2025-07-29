const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Express app and HTTP server
const app = express();
const server = http.createServer(app);

// âœ… ALLOW local + deployed frontend URLs
const allowedOrigins = [
  "http://localhost:5173", // Local frontend
  "https://order-management-1-kt6d.onrender.com", // Live frontend
];

// âœ… CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Health check route
app.get("/healthz", (req, res) => res.send("Server is healthy âœ…"));

// âœ… SOCKET.IO server config
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Connected users tracker
let connectedUsers = {};

io.on("connection", (socket) => {
  console.log("ðŸŸ¢ User connected:", socket.id);

  socket.on("register-user", (userId) => {
    connectedUsers[userId] = socket.id;
    console.log(`ðŸ“² User registered: ${userId} -> ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("ðŸ”´ User disconnected:", socket.id);
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

// âœ… Start server after DB connects
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`ðŸš€ Server running on port ${PORT}`);
  });
});