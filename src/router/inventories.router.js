import express from "express";
import {
    createInventory,
    deleteInventory,
    getInventories,
    getInventory,
    updateInventory,
} from "../controller/inventories.controller.js";

const inventoriesRoutes = express.Router();

inventoriesRoutes.route("/").get(getInventories).post(createInventory);
inventoriesRoutes.route("/:id").get(getInventory).put(updateInventory).delete(deleteInventory);

export default inventoriesRoutes;
