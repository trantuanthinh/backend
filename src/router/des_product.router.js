import express from "express";
import { createDes_Product, deleteDes_Product, getDes_Product, getDes_Products, updateDes_Product } from "../controller/des_product.controller.js";

const des_productRoutes = express.Router();

des_productRoutes.route("/").get(getDes_Products).post(createDes_Product);

des_productRoutes.route("/:id").get(getDes_Product).put(updateDes_Product).delete(deleteDes_Product);

export default des_productRoutes;
