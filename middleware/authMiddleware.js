const jwt = require("jsonwebtoken");

// Middleware to verify JWT and attach user to request
exports.protect = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to check for admin role
exports.adminOnly = (req, res, next) => {
  console.log("Inside adminOnly middleware");
  console.log("User object:", req.user);

  if (req.user?.role !== "admin") {
    console.log("Access denied: Not admin");
    return res.status(403).json({ message: "Admins only" });
  }

  next();
};
