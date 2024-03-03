const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_qty: {
    type: Number,
    required: true,
  },
  product_rate: {
    type: Number,
    required: true,
  },
  product_total: {
    type: Number,
    required: true,
  },
  product_gst: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
