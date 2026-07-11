const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

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
const allowedOrigins = [
  /^https:\/\/product-management-frontend.*\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/, // allows any localhost port during dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((pattern) => pattern.test(origin));

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
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
//
