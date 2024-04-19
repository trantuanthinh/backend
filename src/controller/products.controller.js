import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_PRODUCTS from "../query/products.query.js";
import HttpStatus from "../util/httpStatus.js";
import logger from "../util/logger.js";

export const getProducts = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching products`);
	database.query(QUERY_PRODUCTS.SELECT_PRODUCTS, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No products found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Products retrieved`, results));
		}
	});
};

export const getProduct = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching product`);
	database.query(QUERY_PRODUCTS.SELECT_PRODUCT, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Product by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Product retrieved`, results[0]));
		}
	});
};

export const createProduct = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating product`);
	database.query(QUERY_PRODUCTS.CREATE_PRODUCT, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const product = results[0][0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Product created`, { product }));
		}
	});
};

export const updateProduct = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching product`);
	database.query(QUERY_PRODUCTS.SELECT_PRODUCT, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Product by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating product`);
			database.query(QUERY_PRODUCTS.UPDATE_PRODUCT, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Product updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteProduct = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting product`);
	database.query(QUERY_PRODUCTS.DELETE_PRODUCT, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Product deleted`, results[0]));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Product by id ${req.params.id} was not found`));
		}
	});
};