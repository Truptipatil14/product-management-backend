const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/upload");
const protect = require("../middleware/auth");

const router = express.Router();

// =====================
// IMAGE UPLOAD ROUTE
// =====================

router.post("/upload", protect, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      success: true,
      image: req.file.filename,
      imageUrl: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
});

// =====================
// PRODUCT CRUD ROUTES
// =====================

// Get All Products (public)
router.get("/", getProducts);

// Get Product By ID (public)
router.get("/:id", getProductById);

// Create Product (protected)
router.post("/", protect, createProduct);

// Update Product (protected)
router.put("/:id", protect, updateProduct);

// Delete Product (protected)
router.delete("/:id", protect, deleteProduct);

module.exports = router;
