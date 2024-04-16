import express from "express";
import { createDecor, deleteDecor, getDecor, getDecors, updateDecor } from "../controller/decors.controller copy.js";

const decorsRoutes = express.Router();

decorsRoutes.route("/").get(getDecors).post(createDecor);

decorsRoutes.route("/:id").get(getDecor).put(updateDecor).delete(deleteDecor);

export default decorsRoutes;