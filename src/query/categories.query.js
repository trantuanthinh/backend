const QUERY_CATEGORIES = {
    SELECT_CATEGORIES: "SELECT * FROM `categories`",
    SELECT_CATEGORY: "SELECT * FROM `categories` WHERE `category_id` = ?",
    CREATE_CATEGORY: "INSERT INTO `categories` (`type`, `price`) VALUES (?, ?)",
    UPDATE_CATEGORY: "UPDATE `categories` SET type = ?, `price` = ? WHERE `category_id` = ?",
    DELETE_CATEGORY: "DELETE FROM `categories` WHERE `category_id` = ?",
};

export default QUERY_CATEGORIES;
