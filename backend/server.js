import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import products from "./routes/product.route.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT; // Use the port from .env if available

app.use("/api", products);
// Define a simple route
app.get("*", (req, res) => {
  console.log("Request received at root endpoint");
  res.send("Welcome to the Express API!");
});

// Start Server
app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
  connectMongoDB();
});
