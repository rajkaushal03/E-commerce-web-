import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

// Route to add a product to the cart
router.post("/add-to-cart", async (req, res) => {
  const {
    productId,
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
      (item) => item.productId === productId
    );

    if (!isProductInCart) {
      // Push full product details to the user's cart
      user.cart.push({
        productId,
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
    const { productId, userId } = req.body;
  
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
        (item) => item.productId.toString() !== productId.toString()
      );
  
      // Save the updated user to the database
      await user.save();
  
      // Respond with the updated cart
      res.status(200).json({ message: "Product removed from cart", cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

export default router;
