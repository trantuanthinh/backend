const QUERY_ORDERS_DETAILS = {
    SELECT_ORDER_DETAILS: "SELECT * FROM `decor_details` ORDER BY `decor_detail_id` DESC",
    SELECT_ORDER_DETAIL: "SELECT * FROM `decor_details` WHERE `decor_detail_id` = ?",
    CREATE_ORDER_DETAIL: "INSERT INTO `decor_details` (`decor_id`, `unit_price`, `quantity`, `total_price`) VALUES (?, ?, ?, ?)",
    UPDATE_ORDER_DETAIL: "UPDATE `decor_details` SET `decor_id` = ?, `unit_price` = ?, `quantity` = ?, `total_price` = ? WHERE `decor_detail_id` = ?",
    DELETE_ORDER_DETAIL: "DELETE FROM `decor_details` WHERE `decor_detail_id` = ?",
};

export default QUERY_ORDERS_DETAILS;
