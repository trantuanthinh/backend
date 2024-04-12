import express from "express";
import { createAdmin, deleteAdmin, getAdmin, getAdmins, updateAdmin } from "./../controller/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.route("/").get(getAdmins).post(createAdmin);

adminRoutes.route("/:id").get(getAdmin).put(updateAdmin).delete(deleteAdmin);

export default adminRoutes;
