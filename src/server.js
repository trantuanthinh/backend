import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import wifi from "node-wifi";
import os from "os";
import path from "path";
import url from "url";

import Response from "./domain/response.js";
import HttpStatus from "./util/HttpStatus.js";
import logger from "./util/logger.js";

import adminsRoutes from "./router/admins.router.js";
import categoriesRoutes from "./router/categories.router.js";
import customersRoutes from "./router/customers.router.js";
import decorPhotosRoutes from "./router/decorPhotos.router.js";
import decorsRoutes from "./router/decors.router.js";
import des_prod_detailsRoutes from "./router/des_prod_details.router.js";
import des_productsRoutes from "./router/des_products.router.js";
import flavoursRoutes from "./router/flavours.router.js";
import ordersRoutes from "./router/orders.router.js";
import prodPhotosRoutes from "./router/prodPhotos.router.js";
import productsRoutes from "./router/products.router.js";
import shapesRoutes from "./router/shapes.router.js";
import sizesRoutes from "./router/sizes.router.js";
import totalRoutes from "./router/total.router.js";

wifi.init({
    iface: null,
});

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__basedir = __dirname;

dotenv.config();
const PORT = process.env.SERVER_PORT;
const app = express();

global.__baseURL = `localhost:3000`;

app.listen(PORT, async () => {
    try {
        const wifiInterface = os.networkInterfaces()["Wi-Fi"] || os.networkInterfaces()["wlan0"];

        if (wifiInterface) {
            const wifiIPAddress = wifiInterface.find((netInterface) => netInterface.family === "IPv4").address;
            global.__baseURL = `${wifiIPAddress}:${PORT}`;

            const currentConnections = await wifi.getCurrentConnections();
            if (currentConnections.length > 0) {
                const wifiSSID = currentConnections[0].bssid;
                logger.info(`Connected to Wi-Fi network: ${wifiSSID}`);
            } else {
                logger.info(`Not connected to any Wi-Fi network.`);
            }

            logger.info(`Server is running on baseURL: ${global.__baseURL}`);
        } else {
            logger.info(`Not Found IP Wireless LAN adapter Wi-Fi`);
        }
    } catch (error) {
        logger.error(`Error occurred: ${error.message}`);
    }
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", (_req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "API is running")));

app.use("/api/prod_photo", prodPhotosRoutes);
app.use("/api/decor_photo", decorPhotosRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/decors", decorsRoutes);
app.use("/api/des_products", des_productsRoutes);
app.use("/api/des_prod_details", des_prod_detailsRoutes);
app.use("/api/flavours", flavoursRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/shapes", shapesRoutes);
app.use("/api/sizes", sizesRoutes);

app.use("/api/total", totalRoutes);

app.all("*", (req, res) =>
    res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
            new Response(
                HttpStatus.NOT_FOUND.code,
                HttpStatus.NOT_FOUND.status,
                "Route does not exist on the server"
            )
        )
);
