const QUERY_PRODUCTS = {
    SELECT_PRODUCTS: "SELECT * FROM `products` ORDER BY `created_at` DESC",
    SELECT_PRODUCT: "SELECT * FROM `products` WHERE `prod_id` = ?",
    CREATE_PRODUCT: "INSERT INTO `products` (`decor_detail_id`, `category_id`, `size_id`, `shape_id`, `name`, `image`, `price`) VALUES (?, ?, ?, ?, ?, ?, ?)",
    UPDATE_PRODUCT: "UPDATE `products` SET `decor_detail_id` = ?, `category_id` = ?, `size_id` = ?, `shape_id` = ?, `name` = ?, `image` = ?, `price` = ? WHERE `prod_id` = ?",
    DELETE_PRODUCT: "DELETE FROM `products` WHERE `prod_id` = ?",
};

export default QUERY_PRODUCTS;
