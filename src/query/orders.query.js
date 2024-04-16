const QUERY_ORDERS = {
    SELECT_ORDERS: "SELECT * FROM `orders` ORDER BY `created_at` DESC",
    SELECT_ORDER: "SELECT * FROM `orders` WHERE `order_id` = ?",
    CREATE_ORDER: "INSERT INTO `orders` (`order_detail_id`, `cus_id`, `delivery_status`, `total_unit`, `total_price`) VALUES (?, ?, ?, ?, ?)",
    UPDATE_ORDER: "UPDATE `orders` SET `order_detail_id` = ?, `cus_id` = ?, `delivery_status` = ?, `total_unit` = ?, `total_price` = ? WHERE `order_id` = ?",
    DELETE_ORDER: "DELETE FROM `orders` WHERE `order_id` = ?",
};

export default QUERY_ORDERS;
