import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_ORDERS from "../query/orders.query.js";
import HttpStatus from "../util/httpStatus.js";
import logger from "../util/logger.js";

export const getOrders = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching orders`);
	database.query(QUERY_ORDERS.SELECT_ORDERS, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No orders found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Orders retrieved`, results));
		}
	});
};

export const getOrder = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching order`);
	database.query(QUERY_ORDERS.SELECT_ORDER, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Order by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Order retrieved`, results[0]));
		}
	});
};

export const createOrder = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating order`);
	database.query(QUERY_ORDERS.CREATE_ORDER, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const order = results[0][0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Order created`, { order }));
		}
	});
};

export const updateOrder = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching order`);
	database.query(QUERY_ORDERS.SELECT_ORDER, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Order by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating order`);
			database.query(QUERY_ORDERS.UPDATE_ORDER, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Order updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteOrder = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting order`);
	database.query(QUERY_ORDERS.DELETE_ORDER, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Order deleted`, results[0]));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Order by id ${req.params.id} was not found`));
		}
	});
};