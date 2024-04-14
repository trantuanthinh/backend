import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_CUSTOMERS from "../query/customer.query.js";
import HttpStatus from "../util/httpStatus.js";
import logger from "../util/logger.js";

export const getCustomers = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching customers`);
	database.query(QUERY_CUSTOMERS.SELECT_CUSTOMERS, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No customers found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Customers retrieved`, { customers: results }));
		}
	});
};

export const getCustomer = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching customer`);
	database.query(QUERY_CUSTOMERS.SELECT_CUSTOMER, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Customer by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Customer retrieved`, results[0]));
		}
	});
};

export const createCustomer = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating customer`);
	database.query(QUERY_CUSTOMERS.CREATE_CUSTOMER, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const customer = results[0][0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Customer created`, { customer }));
		}
	});
};

export const updateCustomer = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching customer`);
	database.query(QUERY_CUSTOMERS.SELECT_CUSTOMER, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Customer by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating customer`);
			database.query(QUERY_CUSTOMERS.UPDATE_CUSTOMER, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Customer updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteCustomer = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting customer`);
	database.query(QUERY_CUSTOMERS.DELETE_CUSTOMER, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Customer deleted`, results[0]));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Customer by id ${req.params.id} was not found`));
		}
	});
};

export default HttpStatus;
