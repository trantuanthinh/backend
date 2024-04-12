import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_ADMINS from "../query/admin.query.js";
import logger from "../util/logger.js";

const HttpStatus = {
	OK: { code: 200, status: "OK" },
	CREATED: { code: 201, status: "CREATED" },
	NO_CONTENT: { code: 204, status: "NO_CONTENT" },
	BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
	NOT_FOUND: { code: 404, status: "NOT_FOUND" },
	INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

//get all list of admins
export const getAdmins = (req, res) => {
	logger.info(`${req.method} ${req.originalurl}, fetching admins`);
	database.query(QUERY_ADMINS.SELECT_ADMIN_ACCS, (error, results) => {
		if (!results) {
			res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found An Admin`));
		} else {
			res.status(HttpStatus.OK.code).send(
				new Response(HttpStatus.OK.code, HttpStatus.OK.status, `An Admin Retrieved`, {
					admins: results,
				}),
			);
		}
	});
};

//get an admin by id
export const getAdmin = (req, res) => {
	logger.info(`${req.method} ${req.originalurl}, fetching an admin`);
	database.query(QUERY_ADMINS.SELECT_ADMIN_ACC, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found An Admin by ID: ${req.params.id} `));
		} else {
			res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `An Admin Found`, results[0]));
		}
	});
};

//create an admin, don't need id
export const createAdmin = (req, res) => {
	logger.info(`${req.method} ${req.originalurl}, creating an admin`);
	database.query(QUERY_ADMINS.CREATE_ADMIN_ACC, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Cannot Create An Admin`));
		} else {
			const admin = {
				id: results.insertedId,
				...req.body,
				created_at: new Date(),
			};
			res.status(HttpStatus.CREATED.code).send(
				new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `An Admin Created`, {
					admin,
				}),
			);
		}
	});
};

//update an admin by id
export const updateAdmin = (req, res) => {
	logger.info(`${req.method} ${req.originalurl}, creating an admin`);
	database.query(QUERY_ADMINS.UPDATE_ADMIN_ACC, [req.params.id], (error, results) => {
		if (!results[0]) {
			logger.error(error.message);
			res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Cannot Found An Admin`));
		} else {
			logger.info(`${req.method} ${req.originalurl}, updating an admin`);
			database.query(QUERY_ADMINS.UPDATE_ADMIN_ACC, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code).send(
						new Response(HttpStatus.OK.code, HttpStatus.OK.status, `An Admin Updated`, {
							id: req.params.id,
							...req.body,
						}),
					);
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Cannot Update An Admin`));
				}
			});
		}
	});
};

//delete an admin by id
export const deleteAdmin = (req, res) => {
	logger.info(`${req.method} ${req.originalurl}, creating an admin`);
	database.query(QUERY_ADMINS.DELETE_ADMIN_ACC, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `An Admin Deleted`));
		} else {
			res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found An Admin by ID: ${req.params.id} `));
		}
	});
};

export default HttpStatus;
