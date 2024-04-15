const QUERY_DESIGNED_PRODUCTS = {
    SELECT_DESIGNED_PRODUCTS: "SELECT * FROM `des_product` ORDER BY `created_at` DESC",
    SELECT_DESIGNED_PRODUCT: "SELECT * FROM `des_product` WHERE `des_prod_id` = ?",
    CREATE_DESIGNED_PRODUCT: "INSERT INTO `des_product` (`cus_id`, `decor_id`, `category_id`, `name`, `shape`, `size`) VALUES (?, ?, ?, ?, ?, ?)",
    UPDATE_DESIGNED_PRODUCT: "UPDATE `des_product` SET `cus_id` = ?, `decor_id` = ?, `category_id` = ?, `name` = ?, `shape` = ?, `size` = ? WHERE `des_prod_id` = ?",
    DELETE_DESIGNED_PRODUCT: "DELETE FROM `des_product` WHERE `des_prod_id` = ?",
};

export default QUERY_DESIGNED_PRODUCTS;
