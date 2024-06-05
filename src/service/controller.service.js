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
        const { id } = req.params;
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
        const { TABLE_NAME, COLUMN_NAME } = entity;
        const query = QUERY_SERVICE.createItemQuery(TABLE_NAME, COLUMN_NAME);
        const values = Object.values(req.body);

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
                    `Created Item Successfully: ${TABLE_NAME}`,
                    result[0]
                );
                res.status(status).send(response);
            }
        });
    },

    updateItem: function (entity, req, res) {
        const { TABLE_NAME, PRIMARY_KEY, COLUMN_NAME } = entity;
        const { id } = req.params;
        const query = QUERY_SERVICE.updateItemQuery(TABLE_NAME, PRIMARY_KEY, COLUMN_NAME);
        const values = [...Object.values(req.body), id];

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

    getItemValues: function (entity, req, res) {
        const { TABLE_NAME, PRIMARY_KEY } = entity;
        const { id } = req.params;
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

    createItemValues: function (entity, req, res) {
        const { TABLE_NAME, COLUMN_NAME } = entity;
        const query = QUERY_SERVICE.createItemQuery(TABLE_NAME, COLUMN_NAME);
        const values = [...Object.values(req.body), id];

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
                    `Created Item Successfully: ${TABLE_NAME}`,
                    result[0]
                );
                res.status(status).send(response);
            }
        });
    },

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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getProductsByCategoryId: async function (req, res) {
        const { id } = req.params;
        const query = QUERY_SERVICE.getProductsByCategoryIdQuery();

        try {
            const products = await database.query(query, [id]);

            const status = HttpStatus.OK.code;
            const response = new Response(
                status,
                HttpStatus.OK.status,
                `Get All Successfully: products by category id`,
                products
            );
            res.status(status).send(response);
        } catch (error) {
            const status = HttpStatus.INTERNAL_SERVER_ERROR.code;
            const response = new Response(status, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message);
            res.status(status).send(response);
        }
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

    // getDecorByCategory: function (req, res) {
    //     logger.info(`${req.method} ${req.originalUrl}, fetching decors/type/${req.params.id}`);
    //     database.query(QUERY_SERVICE.getDecorByCategoryQuery(), [req.params.id], (error, results) => {
    //         if (error) {
    //             let status = HttpStatus.INTERNAL_SERVER_ERROR.code;
    //             let response = new Response(
    //                 HttpStatus.INTERNAL_SERVER_ERROR.code,
    //                 HttpStatus.INTERNAL_SERVER_ERROR.status,
    //                 error.message
    //             );
    //             res.status(status).send(response);
    //         } else if (!results || results.length === 0) {
    //             let status = HttpStatus.OK.code;
    //             let response = new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Not found`);
    //             res.status(status).send(response);
    //         } else {
    //             let status = HttpStatus.OK.code;
    //             let response = new Response(
    //                 HttpStatus.OK.code,
    //                 HttpStatus.OK.status,
    //                 `Get All Successfully: decor by decor_category_id`,
    //                 results
    //             );
    //             res.status(status).send(response);
    //         }
    //     });
    // },
};

export default CONTROLLER_SERVICE;
