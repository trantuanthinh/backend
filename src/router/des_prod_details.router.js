import express from "express";
import {
    createDes_Product_Details,
    deleteDes_Product_Details,
    getDes_Product_Details,
    getDes_Products_Details,
    updateDes_Product_Details,
} from "../controller/des_prod_details.controller.js";

const des_prod_detailsRoutes = express.Router();

des_prod_detailsRoutes.route("/").get(getDes_Products_Details).post(createDes_Product_Details);

des_prod_detailsRoutes.route("/:id")
    .get(getDes_Product_Details)
    .put(updateDes_Product_Details)
    .delete(deleteDes_Product_Details);

export default des_prod_detailsRoutes;
