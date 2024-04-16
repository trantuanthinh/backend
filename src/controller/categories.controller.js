import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_CATEGORIES from "../query/categories.query.js";
import HttpStatus from "../util/httpStatus.js";
import logger from "../util/logger.js";

export const getCategories = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching categories`);
	database.query(QUERY_CATEGORIES.SELECT_CATEGORIES, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No categories found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Categories retrieved`, { categories: results }));
		}
	});
};

export const getCategory = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching category`);
	database.query(QUERY_CATEGORIES.SELECT_CATEGORY, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Category by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Category retrieved`, results[0]));
		}
	});
};

export const createCategory = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating category`);
	database.query(QUERY_CATEGORIES.CREATE_CATEGORY, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const category = results[0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Category created`, category));
		}
	});
};

export const updateCategory = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching category`);
	database.query(QUERY_CATEGORIES.SELECT_CATEGORY, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Category by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating category`);
			database.query(QUERY_CATEGORIES.UPDATE_CATEGORY, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Category updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteCategory = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting category`);
	database.query(QUERY_CATEGORIES.DELETE_CATEGORY, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Category deleted`, { id: req.params.id }));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Category by id ${req.params.id} was not found`));
		}
	});
};