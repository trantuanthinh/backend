import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_INVENTORIES from "../query/inventories.query.js";
import HttpStatus from "../util/HttpStatus.js";
import logger from "../util/logger.js";

export const getInventories = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching inventories`);
	database.query(QUERY_INVENTORIES.SELECT_INVENTORIES, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No inventories found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Inventories retrieved`, results));
		}
	});
};

export const getInventory = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching inventory`);
	database.query(QUERY_INVENTORIES.SELECT_INVENTORY, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Inventory by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Inventory retrieved`, results[0]));
		}
	});
};

export const createInventory = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating inventory`);
	database.query(QUERY_INVENTORIES.CREATE_INVENTORY, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const inventory = results[0][0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Inventory created`, { inventory }));
		}
	});
};

export const updateInventory = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching inventory`);
	database.query(QUERY_INVENTORIES.SELECT_INVENTORY, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Inventory by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating inventory`);
			database.query(QUERY_INVENTORIES.UPDATE_INVENTORY, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Inventory updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteInventory = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting inventory`);
	database.query(QUERY_INVENTORIES.DELETE_INVENTORY, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Inventory deleted`, results[0]));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Inventory by id ${req.params.id} was not found`));
		}
	});
};