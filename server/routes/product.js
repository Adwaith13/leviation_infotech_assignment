const express = require("express");
const Product = require("../models/Product");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

router.post("/product", authenticateUser, async (req, res) => {
  try {
    const { product_name, product_qty, product_rate } = req.body;

    if (!product_name || !product_qty || !product_rate) {
      return res.status(400).json({
        status: "Failed",
        message: "All fields required",
      });
    }

    const newProduct = await Product.create({
      user_id: req.user,
      product_name,
      product_qty,
      product_rate,
      product_total: product_qty * product_rate,
      product_gst: product_qty * product_rate * 0.18,
    });

    return res.status(200).json({
      status: "Success",
      message: "Product Added Successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
