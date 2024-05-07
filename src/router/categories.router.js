import express from "express";
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    updateCategory,
} from "../controller/categories.controller.js";

const categoriesRoutes = express.Router();

categoriesRoutes.route("/").get(getCategories).post(createCategory);
categoriesRoutes.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);

export default categoriesRoutes;
