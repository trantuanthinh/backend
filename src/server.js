import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ip from "ip";
import os from "os";
import Response from "./domain/response.js";
import HttpStatus from "./util/HttpStatus.js";
import logger from "./util/logger.js";

import adminsRoutes from "./router/admins.router.js";
import categoriesRoutes from "./router/categories.router.js";
import customersRoutes from "./router/customers.router.js";
import decorsRoutes from "./router/decors.router.js";
import des_productsRoutes from "./router/des_products.router.js";
import flavoursRoutes from './router/flavours.router.js';
import inventoriesRoutes from "./router/inventories.router.js";
import order_detailsRoutes from "./router/order_details.router.js";
import ordersRoutes from "./router/orders.router.js";
import productsRoutes from "./router/products.router.js";
import shapesRoutes from './router/shapes.router.js';
import sizesRoutes from "./router/sizes.router.js";

dotenv.config();
const PORT = process.env.SERVER_PORT;
const app = express();

const networkInterfaces = os.networkInterfaces();
const wifiInterface = networkInterfaces['Wi-Fi'];

app.listen(PORT, () => {
	if (wifiInterface) {
		const wifiIPAddress = wifiInterface.find(netInterface => netInterface.family === 'IPv4').address;
		logger.info(`IP Wireless LAN adapter Wi-fi: ${wifiIPAddress}:${PORT}`);
	} else {
		logger.info(`Not Found IP Wireless LAN adapter Wi-fi`);
	}
	logger.info(`Server is running on: ${ip.address()}:${PORT}`);
	logger.info(`Global Version: ${process.env.GLOBAL_VERSION}`);
});

app.use(cors({ origin: "*", }),);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// adminsRoutes.use(express.json());
// categoriesRoutes.use(express.json());
// customersRoutes.use(express.json());
// decorsRoutes.use(express.json());
// des_productsRoutes.use(express.json());
// flavoursRoutes.use(express.json());
// inventoriesRoutes.use(express.json());
// order_detailsRoutes.use(express.json());
// ordersRoutes.use(express.json());
// productsRoutes.use(express.json());
// shapesRoutes.use(express.json());
// sizesRoutes.use(express.json());

app.get("/api", (_req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "API is running")));

app.use("/api/admins", adminsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/decors", decorsRoutes);
app.use("/api/des_products", des_productsRoutes);
app.use("/api/flavours", flavoursRoutes);
app.use("/api/inventories", inventoriesRoutes);
app.use("/api/order_details", order_detailsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/shapes", shapesRoutes);
app.use("/api/sizes", sizesRoutes);

app.all('*', (req, res) => res.status(HttpStatus.NOT_FOUND.code)
	.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on the server')));
