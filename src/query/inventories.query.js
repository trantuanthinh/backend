const QUERY_INVENTORIES = {
    SELECT_INVENTORIES: "SELECT * FROM `inventories`",
    SELECT_INVENTORY: "SELECT * FROM `inventories` WHERE `inventory_id` = ?",
    CREATE_INVENTORY: "INSERT INTO `inventories` (`prod_id`, `quantity`) VALUES (?, ?)",
    UPDATE_INVENTORY: "UPDATE `inventories` SET `prod_id` = ?, `quantity` = ? WHERE `inventory_id` = ?",
    DELETE_INVENTORY: "DELETE FROM `inventories` WHERE `inventory_id` = ?",
};

export default QUERY_INVENTORIES;
