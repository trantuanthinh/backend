const QUERY_ORDER_DETAILS = {
	SELECT_ORDER_DETAILS: `
        SELECT *
        FROM order_detail
        ORDER BY created_at DESC
    `,

	SELECT_ORDER_DETAIL: `
        SELECT *
        FROM order_detail
        WHERE order_id = ?
    `,

	CREATE_ORDER_DETAIL: `
        INSERT INTO order_detail (prod _id, des_prod _id)
        VALUES (?, ?, ?)
    `,

	UPDATE_ORDER_DETAIL: `
        UPDATE order_detail
        SET prod _id = ?, des_prod _id = ?
    `,

	DELETE_ORDER_DETAIL: `
        DELETE FROM order_detail
        WHERE order_id = ?
    `,
};

export default QUERY_ORDER_DETAILS;
