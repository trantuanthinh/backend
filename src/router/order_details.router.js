import express from "express";
import {
    createOrder_Detail,
    deleteOrder_Detail,
    getOrder_Detail,
    getOrder_Details,
    updateOrder_Detail,
} from "../controller/order_details.controller.js";

const order_detailsRoutes = express.Router();

order_detailsRoutes.route("/").get(getOrder_Details).post(createOrder_Detail);
order_detailsRoutes.route("/:id").get(getOrder_Detail).put(updateOrder_Detail).delete(deleteOrder_Detail);

export default order_detailsRoutes;
