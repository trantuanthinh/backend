import express from "express";
import { createAdmin, deleteAdmin, getAdmin, getAdmins, updateAdmin } from "../controller/admins.controller.js";

const adminsRoutes = express.Router();

adminsRoutes.route("/").get(getAdmins).post(createAdmin);
adminsRoutes.route("/:id").get(getAdmin).put(updateAdmin).delete(deleteAdmin);

export default adminsRoutes;
