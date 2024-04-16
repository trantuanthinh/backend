import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/products.controller.js";

const productsRoutes = express.Router();

productsRoutes.route("/").get(getProducts).post(createProduct);

productsRoutes.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

export default productsRoutes;