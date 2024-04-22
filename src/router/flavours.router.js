import express from "express";
import {
    createFlavour,
    deleteFlavour,
    getFlavour,
    getFlavours,
    updateFlavour,
} from "../controller/flavours.controller.js";

const flavoursRoutes = express.Router();

flavoursRoutes.route("/").get(getFlavours).post(createFlavour);

flavoursRoutes
    .route("/:id")
    .get(getFlavour)
    .put(updateFlavour)
    .delete(deleteFlavour);

export default flavoursRoutes;
