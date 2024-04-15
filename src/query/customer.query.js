const QUERY_CUSTOMERS = {
    SELECT_CUSTOMERS: "SELECT * FROM `customer` ORDER BY `created_at` DESC",
    SELECT_CUSTOMER: "SELECT * FROM `customer` WHERE `cus_id` = ?",
    CREATE_CUSTOMER: "INSERT INTO `customer` (`first_name`, `last_name`, `phone`, `email`) VALUES (?, ?, ?, ?)",
    UPDATE_CUSTOMER: "UPDATE `customer` SET `first_name` = ?, `last_name` = ?, `phone` = ?, `email` = ? WHERE `cus_id` = ?",
    DELETE_CUSTOMER: "DELETE FROM `customer` WHERE `cus_id` = ?",
};

export default QUERY_CUSTOMERS;
