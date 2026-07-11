const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

// DB connect
connectDB();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(
  cors({
    origin: /^https:\/\/product-management-frontend.*\.vercel\.app$/,
    credentials: true,
  }),
);
app.use(express.json());

// ======================
// STATIC FILES (IMAGES)
// ======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
// ROUTES
// ======================
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ======================
// HEALTH CHECK ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Mini E-Commerce API is Running...");
});

// ======================
// ERROR HANDLING (optional but good)
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
