const QUERY_ORDER = {
	SELECT_ORDERS: `
        SELECT *
        FROM orders
        ORDER BY created_at DESC
    `,

	SELECT_ORDER: `
        SELECT *
        FROM orders
        WHERE order_id = ?
    `,

	CREATE_ORDER: `
        INSERT INTO orders (cus_id, delivery_status, total_price, total_unit)
        VALUES (?, ?, ?, ?)
    `,

	UPDATE_ORDER: `
        UPDATE orders
        SET cus_id = ?, delivery_status = ?, total_price = ?, total_unit = ?
    `,

	DELETE_ORDER: `
        DELETE FROM orders
        WHERE order_id = ?
    `,
};

export default QUERY_ORDER;
