import fetch from "node-fetch";
import Product from "../models/product.model.js";

export const fetchProductsAndSave = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products from API");
    }
    const products = await response.json();

    // Insert or update products in the database
    for (const product of products) {
      await Product.updateOne(
        { id: product.id }, // Filter
        {
          $set: {
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: {
              rate: product.rating.rate,
              count: product.rating.count,
            },
          },
        },
        { upsert: true } // Insert if it doesn't exist
      );
      console.log(`Product with id ${product.id} processed.`);
    }

    console.log("Products have been successfully updated or added.");
  } catch (error) {
    console.error("Error fetching or saving products:", error);
  }
};

// export const fetchProducts = async (req, res) => {
//   try {
//     const response = await fetch("https://fakestoreapi.com/products");
//     if (!response.ok) {
//       const errorMessage = await response.text();
//       throw new Error(
//         `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
//       );
//     }
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// };

export const fetchProducts = async (req, res) => {
  try {
    // Query the database to get all products and sort them by id in ascending order
    const products = await Product.find().sort({ id: 1 }); // 1 for ascending, -1 for descending
    res.json(products); // Send the sorted products as a JSON response
  } catch (error) {
    console.error("Error fetching products from database:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { id, title, price, description, category, image, rating } = req.body;

    // Validation (optional)
    if (!title || !price || !description || !category || !image) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new product
    const newProduct = new Product({
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    });

    // Save to MongoDB
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const deleteProduct = async (req, res) => {
//   const { id } = req.body;
//   try {
//     const product = await Product.findById({ id: id });
//     if (!product) {
//       return res.status(404).json({ message: "user not found" });
//     }

//     product = product.filter((item) => item.id.toString() !== id.toString());
//     await product.save();
//     res
//       .status(200)
//       .json({ message: "Product removed from cart", product: product });
//   } catch (error) {
//     console.error("Error adding product:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const deleteProduct = async (req, res) => {
//   const { id } = req.body; // The ID of the product to delete

//   try {
//     // Find the product by its ID
//     const product = await Product.findOne({ id }); // Assuming `id` is a field in your schema
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Delete the product
//     await Product.deleteOne({ id });

//     res.status(200).json({ message: "Product removed successfully", product: product });
//   } catch (error) {
//     console.error("Error deleting product:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const deleteProduct = async (req, res) => {
  const { id } = req.body; // The ID of the product to delete

  try {
    // Find the product by its ID
    const product = await Product.findOne({ id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await Product.deleteOne({ id });

    // Get the updated list of products
    const updatedProducts = await Product.find();

    res.status(200).json({
      message: "Product removed successfully",
      updatedProducts: updatedProducts, // Send the updated list of products
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

