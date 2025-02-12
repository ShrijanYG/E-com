const mongoose = require("mongoose");
const { type } = require("os");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    quantity: {
      type: Number,
      require: true,
    },
    size: {
      type: [String],
      require: true,
    },

    color: {
      type: [String],
      require: true,
    },
  },
  { timestamps: true }
);

const OrderItem = mongoose.model("orderItem", orderItemSchema);
module.exports = OrderItem;
