const ENTITIES = {
    // done admins
    Admins: {
        TABLE_NAME: `admins`,
        PRIMARY_KEY: `ad_id`,
    },

    // done categories
    Categories: {
        TABLE_NAME: `categories`,
        PRIMARY_KEY: `category_id`,
    },

    // done customers
    Customers: {
        TABLE_NAME: `customers`,
        PRIMARY_KEY: `cus_id`,
    },

    // // done decor_details
    // Decor_Details: {
    //     TABLE_NAME: `decor_details`,
    //     PRIMARY_KEY: `decor_detail_id`,
    // },

    // done decors
    Decors: {
        TABLE_NAME: `decors`,
        PRIMARY_KEY: `decor_id`,
    },

    // done decor_categories
    Decor_Categories: {
        TABLE_NAME: `decor_categories`,
        PRIMARY_KEY: `decor_category_id`,
    },

    // done des_products
    Des_Products: {
        TABLE_NAME: `des_products`,
        PRIMARY_KEY: `des_prod_id`,
    },

    // done decor_des_prod_details
    Decor_Des_Products_Details: {
        TABLE_NAME: `decor_des_prod_details`,
        PRIMARY_KEY: `des_prod_id`,
    },

    // done flavours
    Flavours: {
        TABLE_NAME: `flavours`,
        PRIMARY_KEY: `flavour_id`,
    },

    // done order_prod_details
    Order_Prod_Details: {
        TABLE_NAME: `order_prod_details`,
        PRIMARY_KEY: `order_id`,
    },

    // done order_des_prod_details
    Order_Des_Prod_Details: {
        TABLE_NAME: `order_des_prod_details`,
        PRIMARY_KEY: `order_id`,
    },

    // done orders
    Orders: {
        TABLE_NAME: `orders`,
        PRIMARY_KEY: `order_id`,
    },

    // done products
    Products: {
        TABLE_NAME: `products`,
        PRIMARY_KEY: `prod_id`,
    },

    // done shapes
    Shapes: {
        TABLE_NAME: `shapes`,
        PRIMARY_KEY: `shape_id`,
    },

    // done sizes
    Sizes: {
        TABLE_NAME: `sizes`,
        PRIMARY_KEY: `size_id`,
    },

    // done total
    Total: {
        TABLE_NAME: `total`,
        PRIMARY_KEY: `total_id`,
    },

    // done total_detail
    Total_Detail: {
        TABLE_NAME: `total_detail`,
        PRIMARY_KEY: [`total_id`, `order_id`],
    },

    // done products_view
    Products_View: {
        TABLE_NAME: `products_view`,
        PRIMARY_KEY: `prod_id`,
    },

    // done des_products_view
    Des_Products_View: {
        TABLE_NAME: `des_products_view`,
        PRIMARY_KEY: `des_prod_id`,
    },

    // done orders_view
    Orders_View: {
        TABLE_NAME: `orders_view`,
        PRIMARY_KEY: `order_id`,
    },

    // done order_prod_detail_view
    Order_Prod_Detail_View: {
        TABLE_NAME: `order_prod_detail_view`,
        PRIMARY_KEY: `order_id`,
    },

    // done decors_view
    Decors_View: {
        TABLE_NAME: `decors_view`,
        PRIMARY_KEY: `decor_id`,
    },
};

export default ENTITIES;
