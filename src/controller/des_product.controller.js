import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_DESIGNED_PRODUCTS from "../query/des_products.query.js";
import HttpStatus from "../util/httpStatus.js";
import logger from "../util/logger.js";

export const getDes_Products = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching des_products`);
	database.query(QUERY_DESIGNED_PRODUCTS.SELECT_DESIGNED_PRODUCTS, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No des_products found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code,
					HttpStatus.OK.status, `Des_Products retrieved`, results));
		}
	});
};

export const getDes_Product = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching des_product`);
	database.query(QUERY_DESIGNED_PRODUCTS.SELECT_DESIGNED_PRODUCT, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Des_Product by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Des_Product retrieved`, results[0]));
		}
	});
};

export const createDes_Product = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating des_product`);
	database.query(QUERY_DESIGNED_PRODUCTS.CREATE_DESIGNED_PRODUCT, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const des_product = results[0][0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Des_Product created`, { des_product }));
		}
	});
};

export const updateDes_Product = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching des_product`);
	database.query(QUERY_DESIGNED_PRODUCTS.SELECT_DESIGNED_PRODUCT, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Des_Product by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating des_product`);
			database.query(QUERY_DESIGNED_PRODUCTS.UPDATE_DESIGNED_PRODUCT, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Des_Product updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteDes_Product = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting des_product`);
	database.query(QUERY_DESIGNED_PRODUCTS.DELETE_DESIGNED_PRODUCT, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Des_Product deleted`, results[0]));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Des_Product by id ${req.params.id} was not found`));
		}
	});
};