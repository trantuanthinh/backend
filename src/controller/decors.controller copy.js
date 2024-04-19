import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_DECORS from "../query/decors.query.js";
import HttpStatus from "../util/httpStatus.js";
import logger from "../util/logger.js";

export const getDecors = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching decors`);
	database.query(QUERY_DECORS.SELECT_DECORS, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No decors found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Decors retrieved`, results));
		}
	});
};

export const getDecor = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching decor`);
	database.query(QUERY_DECORS.SELECT_DECOR, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Decor by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Decor retrieved`, results[0]));
		}
	});
};

export const createDecor = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating decor`);
	database.query(QUERY_DECORS.CREATE_DECOR, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const decor = results[0][0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Decor created`, { decor }));
		}
	});
};

export const updateDecor = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching decor`);
	database.query(QUERY_DECORS.SELECT_DECOR, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Decor by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating decor`);
			database.query(QUERY_DECORS.UPDATE_DECOR, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Decor updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteDecor = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting decor`);
	database.query(QUERY_DECORS.DELETE_DECOR, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Decor deleted`, results[0]));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Decor by id ${req.params.id} was not found`));
		}
	});
};