import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_ORDERS_DETAILS from "../query/order_detail.query.js";
import HttpStatus from "../util/httpStatus.js";
import logger from "../util/logger.js";

export const getOrder_Details = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching order_details`);
	database.query(QUERY_ORDERS_DETAILS.SELECT_ORDER_DETAILS, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No order_details found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Order_Details retrieved`, { order_details: results }));
		}
	});
};

export const getOrder_Detail = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching order_detail`);
	database.query(QUERY_ORDERS_DETAILS.SELECT_ORDER_DETAIL, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Order_Detail by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Order_Detail retrieved`, results[0]));
		}
	});
};

export const createOrder_Detail = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating order_detail`);
	database.query(QUERY_ORDERS_DETAILS.CREATE_ORDER_DETAIL, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const order_detail = results[0][0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Order_Detail created`, { order_detail }));
		}
	});
};

export const updateOrder_Detail = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching order_detail`);
	database.query(QUERY_ORDERS_DETAILS.SELECT_ORDER_DETAIL, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Order_Detail by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating order_detail`);
			database.query(QUERY_ORDERS_DETAILS.UPDATE_ORDER_DETAIL, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Order_Detail updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteOrder_Detail = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting order_detail`);
	database.query(QUERY_ORDERS_DETAILS.DELETE_ORDER_DETAIL, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Order_Detail deleted`, results[0]));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Order_Detail by id ${req.params.id} was not found`));
		}
	});
};

export default HttpStatus;
