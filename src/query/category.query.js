const QUERY_CATEGORIES = {
    SELECT_CATEGORIES: "SELECT * FROM `category` ORDER BY `created_at` DESC",
    SELECT_CATEGORY: "SELECT * FROM `category` WHERE ``category_id`` = ?",
    CREATE_CATEGORY: "INSERT INTO `category` `type` VALUES ?",
    UPDATE_CATEGORY: "UPDATE `category` SET type = ? WHERE `category_id` = ?",
    DELETE_CATEGORY: "DELETE FROM `category` WHERE `category_id` = ?",
};

export default QUERY_CATEGORIES;
