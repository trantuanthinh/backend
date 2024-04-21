import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_ADMINS from "../query/admins.query.js";
import HttpStatus from "../util/HttpStatus.js";
import logger from "../util/logger.js";
import QUERY_SERVICE from "./query.service.js";

const CONTROLLER_SERVICE = {
	getAll: function (tableName, req, res) {
		logger.info(`${req.method} ${req.originalUrl}, fetching table ${tableName}`);
		database.query(QUERY_SERVICE.getAllQuery(tableName), (error, results) => {
			if (error) {
				let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
				let response = new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);

				res.status(status).send(response);
			} else if (!results || results.length === 0) {
				let status = HttpStatus.OK.code;
				let response = new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Not found`);

				res.status(status).send(response);
			} else {
				let status = HttpStatus.OK.code;
				let response = new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Get All Successfully`, results);

				res.status(status).send(response);
			}
		});
	},

	getItem: function (tableName, tableID, req, res) {
		logger.info(`${req.method} ${req.originalUrl}, fetching admin`);
		const id = req.params.id;
		console.log(QUERY_SERVICE.getItemQuery(tableName, tableID));
		database.query(QUERY_SERVICE.getItemQuery(tableName, tableID), [id], (error, results) => {
			if (error) {
				let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
				let response = new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
				res.status(status).send(response);
			} else if (!results || results.length === 0) {
				let status = HttpStatus.NOT_FOUND.code;
				let response = new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not found`);
				res.status(status).send(response);
			} else {
				let status = HttpStatus.OK.code;
				let response = new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Get Item Successfully`, results[0]);
				res.status(status).send(response);
			}
		});
	},

	createItem: function (req, res) {
		logger.info(`${req.method} ${req.originalUrl}, creating admin`);
		const adminData = req.body;
		database.query(QUERY_ADMINS.CREATE_ADMIN_ACC, Object.values(adminData), (error, results) => {
			if (error) {
				let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
				let response = new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
				res.status(status).send(response);
			} else {
				const admin = results[0];
				let status = HttpStatus.CREATED.code;
				let response = new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Created Successfully`, admin);
				res.status(status).send(response);
			}
		});
	},

	updateItem: function (req, res) {
		logger.info(`${req.method} ${req.originalUrl}, updating admin`);
		const id = req.params.id;
		const adminData = req.body;
		database.query(QUERY_ADMINS.UPDATE_ADMIN_ACC, [...Object.values(adminData), id], (error, results) => {
			if (error) {
				let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
				let response = new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
				res.status(status).send(response);
			} else if (results.affectedRows > 0) {
				let status = HttpStatus.OK.code;
				let response = new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Admin updated`, { id, ...adminData });
				res.status(status).send(response);
			} else {
				let status = HttpStatus.NOT_FOUND.code;
				let response = new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Admin by id ${id} was not found`);
				res.status(status).send(response);
			}
		});
	},

	deleteItem: function (req, res) {
		logger.info(`${req.method} ${req.originalUrl}, deleting admin`);
		const id = req.params.id;
		database.query(QUERY_ADMINS.DELETE_ADMIN_ACC, [id], (error, results) => {
			if (error) {
				let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
				let response = new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
				res.status(status).send(response);
			} else if (results.affectedRows > 0) {
				let status = HttpStatus.OK.code;
				let response = new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Admin deleted`, { id });
				res.status(status).send(response);
			} else {
				let status = HttpStatus.NOT_FOUND.code;
				let response = new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Admin by id ${id} was not found`);
				res.status(status).send(response);
			}
		});
	}
};

export default CONTROLLER_SERVICE;
