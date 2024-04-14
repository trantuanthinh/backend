import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ip from "ip";
import HttpStatus from "./controller/admin.controller.js";
import Response from "./domain/response.js";
import adminRoutes from "./router/admin.router.js";
import categoryRoutes from "./router/category.router.js";
import customerRoutes from "./router/customer.router.js";
import decorRoutes from "./router/decor.router.js";
import des_productRoutes from "./router/des_product.router.js";
import orderRoutes from "./router/order.router.js";
import order_detailRoutes from "./router/order_detail.router.js";
import productRoutes from "./router/product.router.js";
import logger from "./util/logger.js";

dotenv.config();
const PORT = process.env.SERVER_PORT;
const app = express();

app.use(
	cors({
		origin: "*",
	}),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

adminRoutes.use(express.json());
categoryRoutes.use(express.json());
customerRoutes.use(express.json());
decorRoutes.use(express.json());
des_productRoutes.use(express.json());
order_detailRoutes.use(express.json());
orderRoutes.use(express.json());
productRoutes.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/decor", decorRoutes);
app.use("/api/des_product", des_productRoutes);
app.use("/api/order_detail", order_detailRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);

app.get("/api", (_req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "API is running")));

app.all('*', (req, res) => res.status(HttpStatus.NOT_FOUND.code)
	.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on the server')));

app.listen(PORT, () => {
	logger.info(`Server is running on: ${ip.address()}:${PORT}`);
	logger.info(`Global Version: ${process.env.GLOBAL_VERSION}`);
});
