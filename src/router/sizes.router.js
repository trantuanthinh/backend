import express from "express";
import { createSize, deleteSize, getSize, getSizes, updateSize } from "../controller/sizes.controller.js";

const sizesRoutes = express.Router();

sizesRoutes.route("/").get(getSizes).post(createSize);

sizesRoutes.route("/:id").get(getSize).put(updateSize).delete(deleteSize);

export default sizesRoutes;