import express from "express";
import { createShape, deleteShape, getShape, getShapes, updateShape } from "../controller/shapes.controller.js";

const shapesRoutes = express.Router();

shapesRoutes.route("/").get(getShapes).post(createShape);

shapesRoutes.route("/:id").get(getShape).put(updateShape).delete(deleteShape);

export default shapesRoutes;