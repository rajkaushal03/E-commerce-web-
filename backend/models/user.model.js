import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,  // Google ID should be unique for each user
    },
    name: {
      type: String,
      required: true,  // The user's display name
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Email must also be unique
    },
    picture: {
      type: String,
      required: true,  // Store profile picture URL
    },
    cart: {
      type: [String],
      default: [],  // Default an empty cart
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
