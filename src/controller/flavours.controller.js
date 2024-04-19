import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_FLAVOURS from "../query/flavours.query.js";
import HttpStatus from "../util/HttpStatus.js";
import logger from "../util/logger.js";

export const getFlavours = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching flavours`);
	database.query(QUERY_FLAVOURS.SELECT_FLAVOURS, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No flavours found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Flavours retrieved`, results));
		}
	});
};

export const getFlavour = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching flavour`);
	database.query(QUERY_FLAVOURS.SELECT_FLAVOUR, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Flavour by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Flavour retrieved`, results[0]));
		}
	});
};

export const createFlavour = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating flavour`);
	database.query(QUERY_FLAVOURS.CREATE_FLAVOUR, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const flavour = results[0][0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Flavour created`, { flavour }));
		}
	});
};

export const updateFlavour = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching flavour`);
	database.query(QUERY_FLAVOURS.SELECT_FLAVOUR, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Flavour by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating flavour`);
			database.query(QUERY_FLAVOURS.UPDATE_FLAVOUR, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Flavour updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteFlavour = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting flavour`);
	database.query(QUERY_FLAVOURS.DELETE_FLAVOUR, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Flavour deleted`, results[0]));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Flavour by id ${req.params.id} was not found`));
		}
	});
};