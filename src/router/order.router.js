import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from "../controller/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.route("/").get(getOrders).post(createOrder);

orderRoutes.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

export default orderRoutes;
