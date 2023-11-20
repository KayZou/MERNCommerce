const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

const ProductSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    reviews: [ReviewsSchema],
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", ProductSchema);
