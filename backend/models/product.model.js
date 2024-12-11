import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // Stores URL or base64 data
    validate: {
      validator: function (v) {
        return /^(https?:\/\/|data:image\/)/.test(v); // Ensures the value is a URL or base64
      },
      message: "Invalid image URL or format!",
    },
  },
  uploadedImage: {
    type: String,
    required: false, // This can store the path of the uploaded image if stored as a file
  },
  rating: {
    rate: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
