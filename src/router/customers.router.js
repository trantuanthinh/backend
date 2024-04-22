import express from "express";
import {
    createCustomer,
    deleteCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
} from "../controller/customers.controller.js";

const customersRoutes = express.Router();

customersRoutes.route("/").get(getCustomers).post(createCustomer);

customersRoutes
    .route("/:id")
    .get(getCustomer)
    .put(updateCustomer)
    .delete(deleteCustomer);

export default customersRoutes;
