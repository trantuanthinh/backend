import express from "express";
import {
    getDecorPhoto,
    getDecorPhotos,
    removeDecorPhoto,
    uploadDecor,
} from "../controller/decorPhotos.controller.js";

const decorPhotosRoutes = express.Router();

decorPhotosRoutes.route("/").get(getDecorPhotos).post(uploadDecor);
decorPhotosRoutes.route("/:name").get(getDecorPhoto).delete(removeDecorPhoto);

export default decorPhotosRoutes;
