import express from "express";
import User from "../models/user.model.js";
import { ensureAuthenticated } from "../middleware/ensrueAuthenticated.js";

const router = express.Router();

// Route to add a product to the cart
router.post("/add-to-cart",
   async (req, res) => {
  const {
    id,
    userId,
    title,
    price,
    description,
    category,
    image,
    rating,
  } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {
    const user = await User.findById(userId);
    const isProductInCart = user.cart.some(
      (item) => item.id == id
    );

    if (!isProductInCart) {
      // Push full product details to the user's cart
      user.cart.push({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
      });
      await user.save();
    }

    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to remove a product from the cart
router.post("/remove-from-cart", async (req, res) => {
    const { id, userId } = req.body;
  
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
    }
  
    try {
      // Find the user by their ID
      const user = await User.findById(userId);
  
      // Ensure user exists
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Remove the product from the user's cart
      user.cart = user.cart.filter(
        (item) => item.id.toString() !== id.toString()
      );
  
      // Save the updated user to the database
      await user.save();
  
      // Respond with the updated cart
      res.status(200).json({ message: "Product removed from cart", cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
const fetchcart = async (req, res) => {
  const userId = req.user._id; // Assuming user ID is available in req.user after authentication

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user.cart); // Send back the user's cart
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
    console.error("Error fetching cart:", error);
  }
};

// Route to update product quantity in the cart
router.post("/quantity", async (req, res) => {
  const { id, userId, quantityChange } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the product in the user's cart
    const cartItem = user.cart.find((item) => item.id === id);
    
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

    // Update the quantity (ensure it stays >= 1)
    cartItem.quantity = Math.max(cartItem.quantity + quantityChange, 1);

    await user.save();

    res.status(200).json({ message: "Cart updated", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/database' , ensureAuthenticated, fetchcart)
export default router;
