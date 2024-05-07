//done
import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import HttpStatus from "../util/HttpStatus.js";
import logger from "../util/logger.js";
import QUERY_SERVICE from "./query.service.js";

const CONTROLLER_SERVICE = {
    getAll: function (entity, req, res) {
        logger.info(`${req.method} ${req.originalUrl}, fetching table ${entity.TABLE_NAME}`);
        database.query(
            QUERY_SERVICE.getAllQuery(entity.TABLE_NAME),
            // QUERY_SERVICE.getProducts(entity.TABLE_NAME),
            (error, results) => {
                if (error) {
                    let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                    let response = new Response(
                        HttpStatus.INTERNAL_SERVER_ERROR.code,
                        HttpStatus.INTERNAL_SERVER_ERROR.status,
                        error.message
                    );

                    res.status(status).send(response);
                } else if (!results || results.length === 0) {
                    let status = HttpStatus.OK.code;
                    let response = new Response(
                        HttpStatus.OK.code,
                        HttpStatus.OK.status,
                        `Not found: ${entity.TABLE_NAME}`
                    );

                    res.status(status).send(response);
                } else {
                    let status = HttpStatus.OK.code;
                    let response = new Response(
                        HttpStatus.OK.code,
                        HttpStatus.OK.status,
                        `Get All Successfully: ${entity.TABLE_NAME}`,
                        results
                    );

                    res.status(status).send(response);
                }
            }
        );
    },

    getItem: function (entity, req, res) {
        logger.info(`${req.method} ${req.originalUrl}, fetching ${entity.TABLE_NAME}`);
        database.query(
            QUERY_SERVICE.getItemQuery(entity.TABLE_NAME, entity.PRIMARY_KEY),
            [req.params.id],
            (error, results) => {
                if (error) {
                    let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                    let response = new Response(
                        HttpStatus.INTERNAL_SERVER_ERROR.code,
                        HttpStatus.INTERNAL_SERVER_ERROR.status,
                        error.message
                    );
                    res.status(status).send(response);
                } else if (!results || results.length === 0) {
                    let status = HttpStatus.NOT_FOUND.code;
                    let response = new Response(
                        HttpStatus.NOT_FOUND.code,
                        HttpStatus.NOT_FOUND.status,
                        `Not found: ${entity.TABLE_NAME}`
                    );
                    res.status(status).send(response);
                } else {
                    let status = HttpStatus.OK.code;
                    let response = new Response(
                        HttpStatus.OK.code,
                        HttpStatus.OK.status,
                        `Get Item Successfully: ${entity.TABLE_NAME}`,
                        results[0]
                    );
                    res.status(status).send(response);
                }
            }
        );
    },

    createItem: function (entity, req, res) {
        logger.info(`${req.method} ${req.originalUrl}, creating ${entity.TABLE_NAME}`);
        console.log(QUERY_SERVICE.createItemQuery(entity.TABLE_NAME, entity.COLUMN_NAME));
        database.query(
            QUERY_SERVICE.createItemQuery(entity.TABLE_NAME, entity.COLUMN_NAME),
            Object.values(req.body),
            (error, results) => {
                if (error) {
                    let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                    let response = new Response(
                        HttpStatus.INTERNAL_SERVER_ERROR.code,
                        HttpStatus.INTERNAL_SERVER_ERROR.status,
                        error.message
                    );

                    res.status(status).send(response);
                } else {
                    const req = results[0];
                    let status = HttpStatus.CREATED.code;
                    let response = new Response(
                        HttpStatus.CREATED.code,
                        HttpStatus.CREATED.status,
                        `Created Item Successfully: ${entity.TABLE_NAME}`,
                        req
                    );
                    res.status(status).send(response);
                }
            }
        );
    },

    updateItem: function (entity, req, res) {
        logger.info(`${req.method} ${req.originalUrl}, updating ${entity.TABLE_NAME}`);
        database.query(
            QUERY_SERVICE.updateItemQuery(entity.TABLE_NAME, entity.PRIMARY_KEY, entity.COLUMN_NAME),
            [...Object.values(req.body), req.params.id],
            (error, results) => {
                if (error) {
                    let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                    let response = new Response(
                        HttpStatus.INTERNAL_SERVER_ERROR.code,
                        HttpStatus.INTERNAL_SERVER_ERROR.status,
                        error.message
                    );

                    res.status(status).send(response);
                } else if (results.affectedRows > 0) {
                    let status = HttpStatus.OK.code;
                    let response = new Response(
                        HttpStatus.OK.code,
                        HttpStatus.OK.status,
                        `Updated Item Successfully: ${entity.TABLE_NAME}`,
                        { id: req.params.id, ...req.body }
                    );

                    res.status(status).send(response);
                } else {
                    let status = HttpStatus.NOT_FOUND.code;
                    let response = new Response(
                        HttpStatus.NOT_FOUND.code,
                        HttpStatus.NOT_FOUND.status,
                        `Not Found by ID: ${entity.TABLE_NAME}`
                    );

                    res.status(status).send(response);
                }
            }
        );
    },

    deleteItem: function (entity, req, res) {
        logger.info(`${req.method} ${req.originalUrl}, deleting ${entity.TABLE_NAME}`);
        database.query(
            QUERY_SERVICE.deleteItemQuery(entity.TABLE_NAME, entity.PRIMARY_KEY),
            [[req.params.id]],
            (error, results) => {
                if (error) {
                    let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                    let response = new Response(
                        HttpStatus.INTERNAL_SERVER_ERROR.code,
                        HttpStatus.INTERNAL_SERVER_ERROR.status,
                        error.message
                    );

                    res.status(status).send(response);
                } else if (results.affectedRows > 0) {
                    let status = HttpStatus.OK.code;
                    let response = new Response(
                        HttpStatus.OK.code,
                        HttpStatus.OK.status,
                        `Deleted Item Successfully: ${entity.TABLE_NAME}`,
                        { id: req.params.id }
                    );

                    res.status(status).send(response);
                } else {
                    let status = HttpStatus.NOT_FOUND.code;
                    let response = new Response(
                        HttpStatus.NOT_FOUND.code,
                        HttpStatus.NOT_FOUND.status,
                        `Not Found by ID: ${entity.TABLE_NAME}`
                    );

                    res.status(status).send(response);
                }
            }
        );
    },
};

export default CONTROLLER_SERVICE;
