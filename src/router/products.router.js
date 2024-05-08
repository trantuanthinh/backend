import express from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProductByCategoryID,
    getProducts,
    updateProduct,
} from "../controller/products.controller.js";

const productsRoutes = express.Router();

productsRoutes.route("/").get(getProducts).post(createProduct);
productsRoutes.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);
productsRoutes.route("/category/:id").get(getProductByCategoryID);

export default productsRoutes;
