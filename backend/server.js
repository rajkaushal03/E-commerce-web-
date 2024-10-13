import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session"; // Add session
import products from "./routes/product.route.js";
import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.route.js";
import "./passport/google.auth.js";

dotenv.config(); // Move dotenv.config() before usage of environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Add session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api", products);

app.get("*", (req, res) => {
    res.send(`Hello ${req.user.name}`);
});


app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
  connectMongoDB();
});
