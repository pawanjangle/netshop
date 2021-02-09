const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: String,
    total: {
      type: Number,
    },
    deliveryStatus: { type: "String", default: "pending" },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: Number,
        total: Number,
      },
    ],

    //   Items: []
    // },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
