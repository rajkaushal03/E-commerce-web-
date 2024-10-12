// router.js

import express from "express";
import fetch from "node-fetch";

const router = express.Router();

const fetchProducts = async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
      );
    }
    const data = await response.json();
    res.json(data);
    console.log(res);
    // setCart(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
};

router.get("/products", fetchProducts);

export default router;
