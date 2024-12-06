import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import products from "./routes/product.route.js";
import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js"; // Import cart routes
import "./passport/google.auth.js";
import "./passport/github.auth.js"
// import { fetchProductsAndSave } from "./controllers/product.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Add middleware to parse JSON

// Session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes); // Add cart route
app.use("/api", products);

app.get("*", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
  connectMongoDB();
  // fetchProductsAndSave();
});
