const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },

    price: {
      type: Number,
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    image: {
      type: Object,
      require: true,
    },
    rating: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
    color: {
      type: [String],
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    size: {
      type: [String],
      require: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
