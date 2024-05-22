import express from "express";
import { createTotal, deleteTotal, getTotal, getTotals, updateTotal } from "../controller/total.controller.js";

const totalRoutes = express.Router();

totalRoutes.route("/").get(getTotals).post(createTotal);
totalRoutes.route("/:id").get(getTotal).put(updateTotal).delete(deleteTotal);

export default totalRoutes;
