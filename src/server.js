import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ip from "ip";
import HttpStatus from "./controller/admin.controller.js";
import Response from "./domain/response.js";
import adminRoutes from "./router/admin.router.js";
import logger from "./util/logger.js";

dotenv.config();
const PORT = process.env.SERVER_PORT;
const app = express();

app.use(
	cors({
		origin: "*",
	}),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

adminRoutes.use(express.json());

app.use("/api/admin", adminRoutes);

app.get("/api", (_req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "API is running")));

app.all("*", (_req, res) => {
	res.redirect("/api");
});

app.listen(PORT, () => {
	logger.info(`Global Version: ${process.env.GLOBAL_VERSION}`);
	logger.info(`Server is running on: ${ip.address()}:${PORT}`);
});
