const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: { type: String, required: function () { return this.isNew; } },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
