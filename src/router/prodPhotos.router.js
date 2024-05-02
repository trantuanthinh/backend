import express from "express";
import {
    getProdPhoto,
    getProdPhotos,
    removeProdPhoto,
    uploadProd,
} from "../controller/prodPhotos.controller.js";

const prodPhotosRoutes = express.Router();

prodPhotosRoutes.route("/").get(getProdPhotos).post(uploadProd);
prodPhotosRoutes.route("/:name").get(getProdPhoto).delete(removeProdPhoto);

export default prodPhotosRoutes;
