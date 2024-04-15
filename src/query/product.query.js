const QUERY_PRODUCTS = {
    SELECT_PRODUCTS: "SELECT * FROM product ORDER BY `created_at` DESC",
    SELECT_PRODUCT: "SELECT * FROM product WHERE `prod_id` = ?",
    CREATE_PRODUCT: "INSERT INTO product (`decor_id`, `category_id`, `name`, `price`, `image`, `quantity`, `shape`, `size`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    UPDATE_PRODUCT: "UPDATE product SET `decor_id` = ?, `category_id` = ?, `name` = ?, `price` = ?, `image` = ?, `quantity` = ?, `shape` = ?, `size` = ? WHERE `prod_id` = ?",
    DELETE_PRODUCT: "DELETE FROM product WHERE `prod_id` = ?",
};

export default QUERY_PRODUCTS;
