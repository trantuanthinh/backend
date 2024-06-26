import database from "../Global/databaseConnection.js";
import Response from "../domain/response.js";
import ENTITIES from "../model/enity.model.js";
import HttpStatus from "../util/HttpStatus.js";
import logger from "../util/logger.js";
import QUERY_SERVICE from "./query.service.js";

const CONTROLLER_SERVICE = {
    getAll: function (entity, req, res) {
        const { TABLE_NAME } = entity;
        const query = QUERY_SERVICE.getAllQuery(TABLE_NAME);

        logger.info(`${req.method} ${req.originalUrl}, fetching ${TABLE_NAME}`);

        database.query(query, (error, results) => {
            if (error) {
                const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
                res.status(status).send(response);
            } else {
                const status = HttpStatus.OK.code;
                const response = new Response(
                    status,
                    HttpStatus.OK.status,
                    `Get All Successfully: ${TABLE_NAME}`,
                    results
                );
                res.status(status).send(response);
            }
        });
    },

    getItem: function (entity, req, res) {
        const { TABLE_NAME, PRIMARY_KEY } = entity;
        const id = req.params.id;
        const query = QUERY_SERVICE.getItemQuery(TABLE_NAME, PRIMARY_KEY);

        logger.info(`${req.method} ${req.originalUrl}, fetching ${TABLE_NAME}/${id}`);

        database.query(query, [id], (error, [result]) => {
            if (error) {
                const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
                res.status(status).send(response);
            } else if (!result) {
                const status = HttpStatus.NOT_FOUND.code;
                const response = new Response(status, HttpStatus.NOT_FOUND.status, `Not found: ${TABLE_NAME}`);
                res.status(status).send(response);
            } else {
                const status = HttpStatus.OK.code;
                const response = new Response(
                    status,
                    HttpStatus.OK.status,
                    `Get Item Successfully: ${TABLE_NAME}`,
                    result
                );
                res.status(status).send(response);
            }
        });
    },

    createItem: function (entity, req, res) {
        const { TABLE_NAME } = entity;
        const COLUMN_NAMES = Object.keys(req.body);
        const values = Object.values(req.body);
        const query = QUERY_SERVICE.createItemQuery(TABLE_NAME, COLUMN_NAMES);

        logger.info(`${req.method} ${req.originalUrl}, creating ${TABLE_NAME}`);

        database.query(query, values, (error, result) => {
            if (error) {
                const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
                res.status(status).send(response);
            } else {
                const status = HttpStatus.CREATED.code;
                const response = new Response(
                    status,
                    HttpStatus.CREATED.status,
                    `Created ${TABLE_NAME} Successfully`,
                    result
                );
                res.status(status).send(response);
            }
        });
    },

    updateItem: function (entity, req, res) {
        const { TABLE_NAME, PRIMARY_KEY } = entity;
        const id = req.params.id;
        const COLUMN_NAMES = Object.keys(req.body);
        const values = [...Object.values(req.body), id];
        const query = QUERY_SERVICE.updateItemQuery(TABLE_NAME, PRIMARY_KEY, COLUMN_NAMES);

        logger.info(`${req.method} ${req.originalUrl}, updating ${TABLE_NAME}`);

        database.query(query, values, (error, results) => {
            if (error) {
                const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
                res.status(status).send(response);
            } else if (results.affectedRows > 0) {
                const status = HttpStatus.OK.code;
                const response = new Response(status, HttpStatus.OK.status, `Updated ${TABLE_NAME} Successfully`, {
                    id,
                    ...req.body,
                });

                res.status(status).send(response);
            } else {
                const status = HttpStatus.NOT_FOUND.code;
                const response = new Response(
                    status,
                    HttpStatus.NOT_FOUND.status,
                    `Not Found by ID: ${TABLE_NAME}`
                );

                res.status(status).send(response);
            }
        });
    },

    deleteItem: function (entity, req, res) {
        const { TABLE_NAME, PRIMARY_KEY } = entity;
        const id = req.params.id;
        const query = QUERY_SERVICE.deleteItemQuery(TABLE_NAME, PRIMARY_KEY);

        logger.info(`${req.method} ${req.originalUrl}, deleting ${TABLE_NAME}`);

        database.query(query, [[id]], (error, result) => {
            if (error) {
                const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
                res.status(status).send(response);
            } else if (result.affectedRows > 0) {
                const status = HttpStatus.OK.code;
                const response = new Response(
                    status,
                    HttpStatus.OK.status,
                    `Deleted Item Successfully: ${TABLE_NAME}`,
                    { id }
                );
                res.status(status).send(response);
            } else {
                const status = HttpStatus.NOT_FOUND.code;
                const response = new Response(
                    status,
                    HttpStatus.NOT_FOUND.status,
                    `Not Found by ID: ${TABLE_NAME}`
                );
                res.status(status).send(response);
            }
        });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // get many items of the table
    getItemValues: function (entity, req, res) {
        const { TABLE_NAME, PRIMARY_KEY } = entity;
        const id = req.params.id;
        const query = QUERY_SERVICE.getItemQuery(TABLE_NAME, PRIMARY_KEY);

        logger.info(`${req.method} ${req.originalUrl}, fetching ${TABLE_NAME}/${id}`);

        database.query(query, [id], (error, result) => {
            if (error) {
                const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
                res.status(status).send(response);
            } else if (!result) {
                const status = HttpStatus.NOT_FOUND.code;
                const response = new Response(status, HttpStatus.NOT_FOUND.status, `Not found: ${TABLE_NAME}`);
                res.status(status).send(response);
            } else {
                const status = HttpStatus.OK.code;
                const response = new Response(
                    status,
                    HttpStatus.OK.status,
                    `Get Item Successfully: ${TABLE_NAME}`,
                    result
                );
                res.status(status).send(response);
            }
        });
    },

    // get the last item of the table
    getLastItem: function (entity, req, res) {
        const { TABLE_NAME, PRIMARY_KEY } = entity;
        const query = QUERY_SERVICE.getLastItemQuery(TABLE_NAME, PRIMARY_KEY);

        logger.info(`${req.method} ${req.originalUrl}, fetching last item ${TABLE_NAME}`);

        database.query(query, (error, [result]) => {
            if (error) {
                const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
                res.status(status).send(response);
            } else if (!result) {
                const status = HttpStatus.NOT_FOUND.code;
                const response = new Response(status, HttpStatus.NOT_FOUND.status, `Not found: ${TABLE_NAME}`);
                res.status(status).send(response);
            } else {
                const status = HttpStatus.OK.code;
                const response = new Response(
                    status,
                    HttpStatus.OK.status,
                    `Get Last Item Successfully: ${TABLE_NAME}`,
                    result
                );
                res.status(status).send(response);
            }
        });
    },

    // create the item of the table which has the n-n relationship
    createItemValues: async function (entity, req, res) {
        const { TABLE_NAME } = entity;
        const COLUMN_NAME = Object.keys(req.body);
        const values = [...Object.values(req.body)];
        const transformedArray = [values[0], values[1].flat(), values[2]];
        const query = QUERY_SERVICE.createItemQuery(TABLE_NAME, COLUMN_NAME);

        logger.info(`${req.method} ${req.originalUrl}, creating ${TABLE_NAME}`);

        try {
            const results = await Promise.all(
                transformedArray[1].map(async (element) => {
                    const inputValue = [transformedArray[0], element, transformedArray[2]];
                    return await new Promise((resolve, reject) => {
                        database.query(query, inputValue, (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        });
                    });
                })
            );

            const status = HttpStatus.CREATED.code;
            const response = new Response(
                status,
                HttpStatus.CREATED.status,
                `Created Item Values Successfully: ${TABLE_NAME}`,
                results
            );
            res.status(status).send(response);
        } catch (error) {
            const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
            const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
            res.status(status).send(response);
        }
    },

    // delete the item of the table which has the FK in other tables
    deleteItemValues: async function (listEntity, entity, req, res) {
        console.log(req.params.id);
        const { TABLE_NAME, PRIMARY_KEY } = entity;
        const id = req.params.id;
        const query = QUERY_SERVICE.deleteItemQuery(TABLE_NAME, PRIMARY_KEY);

        logger.info(`${req.method} ${req.originalUrl}, deleting ${TABLE_NAME}`);

        listEntity.map(async (element) => {
            const tempQuery = QUERY_SERVICE.deleteItemQuery(element.TABLE_NAME, element.PRIMARY_KEY);

            logger.info(`${req.method} ${req.originalUrl}, deleting ${element.TABLE_NAME}`);

            return await new Promise((resolve, reject) => {
                database.query(tempQuery, [id], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        })

        database.query(query, [[id]], (error, result) => {
            if (error) {
                const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
                res.status(status).send(response);
            } else if (result.affectedRows > 0) {
                const status = HttpStatus.OK.code;
                const response = new Response(
                    status,
                    HttpStatus.OK.status,
                    `Deleted Item Successfully: ${TABLE_NAME}`,
                    { id }
                );
                res.status(status).send(response);
            } else {
                const status = HttpStatus.NOT_FOUND.code;
                const response = new Response(
                    status,
                    HttpStatus.NOT_FOUND.status,
                    `Not Found by ID: ${TABLE_NAME}`
                );
                res.status(status).send(response);
            }
        });
    },

    createDecorDesignedProductValues: async function (entity, req, res) {
        const { TABLE_NAME } = entity;
        const COLUMN_NAME = Object.keys(req.body);
        const decor_id = req.body.decor_id;
        const des_prod_id = req.body.des_prod_id;
        const quantity = req.body.quantity;

        const transformedArray = [des_prod_id, decor_id.flat(), quantity];
        const query = QUERY_SERVICE.createItemQuery(TABLE_NAME, COLUMN_NAME);

        logger.info(`${req.method} ${req.originalUrl}, creating ${TABLE_NAME}`);

        try {
            const results = await Promise.all(
                transformedArray[1].map(async (element) => {
                    const inputValue = [transformedArray[0], element, transformedArray[2]];
                    return await new Promise((resolve, reject) => {
                        database.query(query, inputValue, (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        });
                    });
                })
            );

            const status = HttpStatus.CREATED.code;
            const response = new Response(
                status,
                HttpStatus.CREATED.status,
                `Created Item Values Successfully: ${TABLE_NAME}`,
                results
            );
            res.status(status).send(response);
        } catch (error) {
            const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
            const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
            res.status(status).send(response);
        }
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getProductsByCategoryId: function (entity, req, res) {
        const { TABLE_NAME } = entity;
        const id = req.params.id;
        const query = QUERY_SERVICE.getProductsByCategoryIdQuery(TABLE_NAME);

        logger.info(`${req.method} ${req.originalUrl}, fetching ${TABLE_NAME}`);

        database.query(query, [id], (error, results) => {
            if (error) {
                const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
                const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
                res.status(status).send(response);
            } else {
                const status = HttpStatus.OK.code;
                const response = new Response(
                    status,
                    HttpStatus.OK.status,
                    `Get All Successfully: products by category id`,
                    results
                );
                res.status(status).send(response);
            }
        });
    },

    getOrders: async function (entity, req, res) {
        logger.info(`${req.method} ${req.originalUrl}, fetching table ${entity.TABLE_NAME}`);
        try {
            const parentResults = await new Promise((resolve, reject) => {
                database.query(QUERY_SERVICE.getAllQuery(entity.TABLE_NAME), (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            if (!parentResults || parentResults.length === 0) {
                const status = HttpStatus.OK.code;
                const response = new Response(
                    HttpStatus.OK.code,
                    HttpStatus.OK.status,
                    `Not found: ${entity.TABLE_NAME}`
                );
                return res.status(status).send(response);
            }

            // Fetch child results for both order products and order des products
            await Promise.all(
                parentResults.map(async (item) => {
                    let order_prod = ENTITIES.Order_Prod_Details;
                    const productsPromise = new Promise((resolve, reject) => {
                        database.query(
                            QUERY_SERVICE.getItemQuery(order_prod.TABLE_NAME, order_prod.PRIMARY_KEY),
                            [item.order_id],
                            (error, childResults) => {
                                if (error) {
                                    return reject(error);
                                }

                                if (!childResults || childResults.length === 0) {
                                    return resolve([]);
                                }

                                // Assuming childResults is an array of results
                                const formattedResults = childResults.map((prod) => ({
                                    prod_id: prod.prod_id,
                                    prod_quantity: prod.prod_quantity,
                                }));
                                resolve(formattedResults);
                            }
                        );
                    });

                    let order_des_prod = ENTITIES.Order_Des_Prod_Details;
                    const desProductsPromise = new Promise((resolve, reject) => {
                        database.query(
                            QUERY_SERVICE.getItemQuery(order_des_prod.TABLE_NAME, order_des_prod.PRIMARY_KEY),
                            [item.order_id],
                            (error, childResults) => {
                                if (error) {
                                    return reject(error);
                                }

                                if (!childResults || childResults.length === 0) {
                                    return resolve([]);
                                }

                                const formattedResults = childResults.map((desProd) => ({
                                    des_prod_id: desProd.des_prod_id,
                                    des_prod_quantity: desProd.des_prod_quantity,
                                }));
                                resolve(formattedResults);
                            }
                        );
                    });

                    const [products, desProducts] = await Promise.all([productsPromise, desProductsPromise]);

                    item.products = products || [];
                    item.des_products = desProducts || [];
                })
            );

            const status = HttpStatus.OK.code;
            const response = new Response(
                HttpStatus.OK.code,
                HttpStatus.OK.status,
                `Get All Successfully: ${entity.TABLE_NAME}`,
                parentResults
            );
            res.status(status).send(response);
        } catch (error) {
            const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
            const response = new Response(
                HttpStatus.INTERNAL_SERVER_ERROR.code,
                HttpStatus.INTERNAL_SERVER_ERROR.status,
                error.message
            );
            res.status(status).send(response);
        }
    },

    getOrder: async function (entity, req, res) {
        logger.info(`${req.method} ${req.originalUrl}, fetching table ${entity.TABLE_NAME}`);
        try {
            const parentResults = await new Promise((resolve, reject) => {
                database.query(
                    QUERY_SERVICE.getItemQuery(entity.TABLE_NAME, entity.PRIMARY_KEY),
                    [req.params.id],
                    (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(results);
                    }
                );
            });

            if (!parentResults || parentResults.length === 0) {
                const status = HttpStatus.OK.code;
                const response = new Response(
                    HttpStatus.OK.code,
                    HttpStatus.OK.status,
                    `Not found: ${entity.TABLE_NAME}`
                );
                return res.status(status).send(response);
            }

            // Fetch child results for both order products and order des products
            await Promise.all(
                parentResults.map(async (item) => {
                    let order_prod = ENTITIES.Order_Prod_Detail_View;
                    const productsPromise = new Promise((resolve, reject) => {
                        database.query(
                            QUERY_SERVICE.getItemQuery(order_prod.TABLE_NAME, order_prod.PRIMARY_KEY),
                            [item.order_id],
                            (error, childResults) => {
                                if (error) {
                                    return reject(error);
                                }

                                if (!childResults || childResults.length === 0) {
                                    return resolve([]);
                                }

                                const formattedResults = childResults.map((prod) => ({
                                    prod_id: prod.prod_id,
                                    quantity: prod.prod_quantity,
                                    name: prod.name,
                                    image: prod.image,
                                    price: prod.price,
                                    originPrice: prod.originPrice,
                                    type: prod.type,
                                    shape: prod.shape,
                                    flavour: prod.flavour,
                                }));
                                resolve(formattedResults);
                            }
                        );
                    });

                    let order_des_prod = ENTITIES.Order_Des_Prod_Details;
                    const desProductsPromise = new Promise((resolve, reject) => {
                        database.query(
                            QUERY_SERVICE.getItemQuery(order_des_prod.TABLE_NAME, order_des_prod.PRIMARY_KEY),
                            [item.order_id],
                            (error, childResults) => {
                                if (error) {
                                    return reject(error);
                                }

                                if (!childResults || childResults.length === 0) {
                                    return resolve([]);
                                }

                                const formattedResults = childResults.map((desProd) => ({
                                    des_prod_id: desProd.des_prod_id,
                                    des_prod_quantity: desProd.des_prod_quantity,
                                }));
                                resolve(formattedResults);
                            }
                        );
                    });

                    const [products, desProducts] = await Promise.all([productsPromise, desProductsPromise]);

                    item.products = products || [];
                    item.des_products = desProducts || [];
                })
            );

            const status = HttpStatus.OK.code;
            const response = new Response(
                HttpStatus.OK.code,
                HttpStatus.OK.status,
                `Get All Successfully: ${entity.TABLE_NAME}`,
                parentResults[0]
            );
            res.status(status).send(response);
        } catch (error) {
            const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
            const response = new Response(
                HttpStatus.INTERNAL_SERVER_ERROR.code,
                HttpStatus.INTERNAL_SERVER_ERROR.status,
                error.message
            );
            res.status(status).send(response);
        }
    },
};

export default CONTROLLER_SERVICE;
