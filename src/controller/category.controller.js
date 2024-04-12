import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import QUERY_CATEGORIES from "../query/category.query.js";
import logger from "../util/logger.js";

const HttpStatus = {
	OK: { code: 200, status: "OK" },
	CREATED: { code: 201, status: "CREATED" },
	NO_CONTENT: { code: 204, status: "NO_CONTENT" },
	BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
	NOT_FOUND: { code: 404, status: "NOT_FOUND" },
	INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

//get all list of categories
export const getAdmins = (req, res) => {
	logger.info(`${req.method} ${req.originalurl}, fetching categories`);
	database.query(QUERY_CATEGORIES.SELECT_CATEGORIES, (error, results) => {
		if (!results) {
			res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found An Category`));
		} else {
			res.status(HttpStatus.OK.code).send(
				new Response(HttpStatus.OK.code, HttpStatus.OK.status, `An Category Retrieved`, {
					categories: results,
				}),
			);
		}
	});
};

//get an category by id
export const getCategoies = (req, res) => {
	logger.info(`${req.method} ${req.originalurl}, fetching an category`);
	database.query(QUERY_CATEGORIES.SELECT_CATEGORY, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found An Category by ID: ${req.params.id} `));
		} else {
			res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `An Category Found`, results[0]));
		}
	});
};

//create an category, don't need id
export const getCategory = (req, res) => {
	logger.info(`${req.method} ${req.originalurl}, creating an category`);
	database.query(QUERY_CATEGORIES.CREATE_CATEGORY, Object.values(req.body), (error, results) => {
		if (!results) {
			logger.error(error.message);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Cannot Create An Category`));
		} else {
			const category = {
				id: results.insertedId,
				...req.body,
				created_at: new Date(),
			};
			res.status(HttpStatus.CREATED.code).send(
				new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `An Category Created`, {
					category,
				}),
			);
		}
	});
};

//update an category by id
export const updateCATEGORY = (req, res) => {
	logger.info(`${req.method} ${req.originalurl}, creating an category`);
	database.query(QUERY_CATEGORIES.UPDATE_CATEGORY, [req.params.id], (error, results) => {
		if (!results[0]) {
			logger.error(error.message);
			res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Cannot Found An Category`));
		} else {
			logger.info(`${req.method} ${req.originalurl}, updating an Category`);
			database.query(QUERY_CATEGORIES.UPDATE_CATEGORY, [...Object.values(req.body), req.params.id], (error, results) => {
				if (!error) {
					res.status(HttpStatus.OK.code).send(
						new Response(HttpStatus.OK.code, HttpStatus.OK.status, `An Admin Updated`, {
							id: req.params.id,
							...req.body,
						}),
					);
				} else {
					logger.error(error.message);
					res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Cannot Update An Category`));
				}
			});
		}
	});
};

//delete an category by id
export const deleteCategory = (req, res) => {
	logger.info(`${req.method} ${req.originalurl}, creating an category`);
	database.query(QUERY_CATEGORIES.DELETE_CATEGORY, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `An Category Deleted`));
		} else {
			res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Not Found An Category by ID: ${req.params.id} `));
		}
	});
};

export default HttpStatus;
