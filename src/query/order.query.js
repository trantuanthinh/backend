const QUERY_ORDERS = {
    SELECT_ORDERS: "SELECT * FROM `order` ORDER BY `created_at` DESC",
    SELECT_ORDER: "SELECT * FROM `order` WHERE order_id = ?",
    CREATE_ORDER: "INSERT INTO `order` (`cus_id`, `delivery_status`, `total_price`, `total_unit`) VALUES (?, ?, ?, ?)",
    UPDATE_ORDER: "UPDATE `order` SET `cus_id` = ?, `delivery_status` = ?, `total_price` = ?, `total_unit` = ? WHERE `order_id` = ?",
    DELETE_ORDER: "DELETE FROM `order` WHERE `order_id` = ?",
};

export default QUERY_ORDERS;
