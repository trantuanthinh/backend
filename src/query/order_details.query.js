const QUERY_ORDERS_DETAILS = {
    SELECT_ORDER_DETAILS: "SELECT * FROM `order_details` ORDER BY `order_detail_id` DESC",
    SELECT_ORDER_DETAIL: "SELECT * FROM `order_details` WHERE `order_detail_id` = ?",
    CREATE_ORDER_DETAIL: "INSERT INTO `order_details` (`prod_id`, `prod_quantity`, `des_prod_id`, `des_prod_quantity`) VALUES (?, ?, ?, ?)",
    UPDATE_ORDER_DETAIL: "UPDATE `order_details` SET `prod_id` = ?, `prod_quantity` = ?, `des_prod_id` = ?, `des_prod_quantity` = ? WHERE `order_detail_id` = ?",
    DELETE_ORDER_DETAIL: "DELETE FROM `order_details` WHERE `order_detail_id` = ?",
};

export default QUERY_ORDERS_DETAILS;
