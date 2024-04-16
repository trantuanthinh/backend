import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_SHAPES from "../query/shapes.query.js";
import HttpStatus from "../util/httpStatus.js";
import logger from "../util/logger.js";

export const getShapes = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching shapes`);
	database.query(QUERY_SHAPES.SELECT_SHAPES, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No shapes found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Shapes retrieved`, { shapes: results }));
		}
	});
};

export const getShape = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching shape`);
	database.query(QUERY_SHAPES.SELECT_SHAPE, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Shape by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Shape retrieved`, results[0]));
		}
	});
};

export const createShape = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating shape`);
	database.query(QUERY_SHAPES.CREATE_SHAPE, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const shape = results[0][0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Shape created`, { shape }));
		}
	});
};

export const updateShape = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching shape`);
	database.query(QUERY_SHAPES.SELECT_SHAPE, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Shape by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating shape`);
			database.query(QUERY_SHAPES.UPDATE_SHAPE, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Shape updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteShape = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting shape`);
	database.query(QUERY_SHAPES.DELETE_SHAPE, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Shape deleted`, results[0]));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Shape by id ${req.params.id} was not found`));
		}
	});
};
