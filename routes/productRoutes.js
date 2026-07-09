

const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/upload");

const router = express.Router();


// =====================
// IMAGE UPLOAD ROUTE
// =====================

router.post("/upload", upload.single("image"), (req, res) => {
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


// Create Product
router.post("/", createProduct);


// Get All Products
router.get("/", getProducts);


// Get Product By ID
router.get("/:id", getProductById);


// Update Product
router.put("/:id", updateProduct);


// Delete Product
router.delete("/:id", deleteProduct);


module.exports = router;