const QUERY_DECOR_DETAILS = {
    SELECT_DECOR_DETAILS: "SELECT * FROM `decor_details`",
    SELECT_DECOR_DETAIL: "SELECT * FROM `decor_details` WHERE `decor_detail_id` = ?",
    CREATE_DECOR_DETAIL: "INSERT INTO `decor_details` (`decor_id`, `unit_price`, `quantity`, `total_price`) VALUES (?, ?, ?, ?)",
    UPDATE_DECOR_DETAIL: "UPDATE `decor_details` SET `decor_id` = ?, `unit_price` = ?, `quantity` = ?, `total_price` = ? WHERE `decor_detail_id` = ?",
    DELETE_DECOR_DETAIL: "DELETE FROM `decor_details` WHERE `decor_detail_id` = ?",
};

export default QUERY_DECOR_DETAILS;
