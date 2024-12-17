import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true, // This can store URL or base64-encoded image data
  },
  
  rating: {
    rate: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
