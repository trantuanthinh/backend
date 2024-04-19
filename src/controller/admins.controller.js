import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_ADMINS from "../query/admins.query.js";
import HttpStatus from "../util/httpStatus.js";
import logger from "../util/logger.js";

export const getAdmins = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching admins`);
	database.query(QUERY_ADMINS.SELECT_ADMIN, (error, results) => {
		if (!results) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No admins found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Admins retrieved`, results));
		}
	});
};

export const getAdmin = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching admin`);
	database.query(QUERY_ADMINS.SELECT_ADMIN_ACC, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Admin by id ${req.params.id} was not found`));
		} else {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Admin retrieved`, results[0]));
		}
	});
};

export const createAdmin = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, creating admin`);
	database.query(QUERY_ADMINS.CREATE_ADMIN_ACC, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
				.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
		} else {
			const admin = results[0];
			res.status(HttpStatus.CREATED.code)
				.send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Admin created`, admin));
		}
	});
};

export const updateAdmin = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching admin`);
	database.query(QUERY_ADMINS.SELECT_ADMIN_ACC, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Admin by id ${req.params.id} was not found`));
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating admin`);
			database.query(QUERY_ADMINS.UPDATE_ADMIN_ACC, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code)
						.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Admin updated`, { id: req.params.id, ...req.body }));
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
						.send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
				}
			});
		}
	});
};

export const deleteAdmin = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting admin`);
	database.query(QUERY_ADMINS.DELETE_ADMIN_ACC, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.OK.code)
				.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Admin deleted`, { id: req.params.id }));
		} else {
			res.status(HttpStatus.NOT_FOUND.code)
				.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Admin by id ${req.params.id} was not found`));
		}
	});
};