// Create Product
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      brand,
      price,
      discount,
      stock,
      description,
      image,
      status,
    } = req.body;

    const finalPrice =
      Number(price) - (Number(price) * Number(discount || 0)) / 100;

    const product = await Product.create({
      productName,
      category,
      brand,
      price,
      discount,
      finalPrice,
      stock,
      description,
      image,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};