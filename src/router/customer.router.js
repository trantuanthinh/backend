import express from "express";
import { createCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "../controller/customer.controller.js";

const customerRoutes = express.Router();

customerRoutes.route("/").get(getCustomers).post(createCustomer);

customerRoutes.route("/:id").get(getCustomer).put(updateCustomer).delete(deleteCustomer);

export default customerRoutes;
