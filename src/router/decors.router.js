import express from "express";
import { createDecor, deleteDecor, getDecor, getDecors, updateDecor } from "../controller/decors.controller.js";

const decorsRoutes = express.Router();

decorsRoutes.route("/").get(getDecors).post(createDecor);
decorsRoutes.route("/:id").get(getDecor).put(updateDecor).delete(deleteDecor);
// decorsRoutes.route("/type/:id").get(getDecorByCategory);

export default decorsRoutes;
