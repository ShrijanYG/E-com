const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItem",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    totalAmount: { type: Number, require: true },
    address: { type: String, require: true },
    paymentMethod: { type: String, require: true },
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
