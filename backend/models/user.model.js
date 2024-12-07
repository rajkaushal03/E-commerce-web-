import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // unique: true,
    },
    googleId: {
      type: String,
      unique: true, // Google ID should be unique for each user
    },
    profileUrl: {
      type: String,
    },
    name: {
      type: String,
      required: true, // The user's display name
    },
    email: {
      type: String,
      default: "",
      unique: true, // Email must also be unique
    },
    picture: {
      type: String,
      required: true, // Store profile picture URL
    },
    account : {
      type:String,
      required:true,
    },
    cart: {
      type: [
        {
          id: Number,
          title: String,
          price: Number,
          quantity: { type: Number, default: 1 },
          description: String,
          category: String,
          image: String,
          rating: {
            rate: Number,
            count: Number,
          },
        },
      ],
      default: [], // Default to an empty array
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
