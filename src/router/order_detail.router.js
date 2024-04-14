import express from "express";
import { createOrder_Detail, deleteOrder_Detail, getOrder_Detail, getOrder_Details, updateOrder_Detail } from "../controller/order_detail.controller.js";

const order_detailRoutes = express.Router();

order_detailRoutes.route("/").get(getOrder_Details).post(createOrder_Detail);

order_detailRoutes.route("/:id").get(getOrder_Detail).put(updateOrder_Detail).delete(deleteOrder_Detail);

export default order_detailRoutes;
