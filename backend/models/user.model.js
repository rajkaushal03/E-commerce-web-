import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
        type: String,
        default: "", 
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    
    passward: {
        type: String,
        required: true,
    },
    cart: {
      type: [String],
      default: [],
    },
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);


export default User;