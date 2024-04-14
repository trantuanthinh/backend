import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/product.controller.js";

const productRoutes = express.Router();

productRoutes.route("/").get(getProducts).post(createProduct);

productRoutes.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

export default productRoutes;
