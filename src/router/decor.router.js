import express from "express";
import { createDecor, deleteDecor, getDecor, getDecors, updateDecor } from "../controller/decor.controller.js";

const decorRoutes = express.Router();

decorRoutes.route("/").get(getDecors).post(createDecor);

decorRoutes.route("/:id").get(getDecor).put(updateDecor).delete(deleteDecor);

export default decorRoutes;
