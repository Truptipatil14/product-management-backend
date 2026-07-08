

const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ✅ IMPORTANT FIX: upload import
const upload = require("../middleware/upload");

const router = express.Router();

// =====================
// PRODUCT ROUTES
// =====================

// Create Product
router.post("/", createProduct);

// Get Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProductById);

// Update Product
router.put("/:id", updateProduct);

// Delete Product
router.delete("/:id", deleteProduct);


// =====================
// IMAGE UPLOAD ROUTE
// =====================
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      image: req.file.filename,
      imageUrl: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;