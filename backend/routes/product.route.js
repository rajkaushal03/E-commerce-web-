import express from "express";
import { ensureAuthenticated } from "../middleware/ensrueAuthenticated.js";

import {
  addProduct,
  deleteProduct,
  fetchProducts,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/products", ensureAuthenticated, fetchProducts);

router.post("/add", addProduct);
router.post("/delete", deleteProduct);
export default router;
