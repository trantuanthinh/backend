import express from "express";
import {
    createDes_Product,
    deleteDes_Product,
    getDes_Product,
    getDes_Products,
    getLastDes_Product,
    updateDes_Product,
} from "../controller/des_products.controller.js";

const des_productsRoutes = express.Router();

des_productsRoutes.route("/").get(getDes_Products).post(createDes_Product);
des_productsRoutes.route("/last").get(getLastDes_Product);

des_productsRoutes.route("/:id").get(getDes_Product).put(updateDes_Product).delete(deleteDes_Product);

export default des_productsRoutes;
