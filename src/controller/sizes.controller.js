import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_SIZES from "../query/sizes.query.js";
import HttpStatus from "../util/HttpStatus.js";
import logger from "../util/logger.js";

export const getSizes = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching sizes`);
	database.query(QUERY_SIZES.SELECT_SIZES, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No sizes found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Sizes retrieved`, results));
		}
	});
};

export const getSize = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching size`);
	database.query(QUERY_SIZES.SELECT_SIZE, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Size by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Size retrieved`, results[0]));
		}
	});
};

export const createSize = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating size`);
	database.query(QUERY_SIZES.CREATE_SIZE, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const size = results[0][0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Size created`, { size }));
		}
	});
};

export const updateSize = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching size`);
	database.query(QUERY_SIZES.SELECT_SIZE, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Size by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating size`);
			database.query(QUERY_SIZES.UPDATE_SIZE, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Size updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteSize = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting size`);
	database.query(QUERY_SIZES.DELETE_SIZE, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Size deleted`, results[0]));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Size by id ${req.params.id} was not found`));
		}
	});
};

