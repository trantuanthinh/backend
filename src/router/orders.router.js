import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from "../controller/order.controllers.js";

const ordersRoutes = express.Router();

ordersRoutes.route("/").get(getOrders).post(createOrder);

ordersRoutes.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

export default ordersRoutes;
