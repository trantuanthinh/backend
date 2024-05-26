const ENTITIES = {
    // done admins
    Admins: {
        TABLE_NAME: `admins`,
        PRIMARY_KEY: `ad_id`,
        COLUMN_NAME: [`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`],
    },

    // done categories
    Categories: {
        TABLE_NAME: `categories`,
        PRIMARY_KEY: `category_id`,
        COLUMN_NAME: [`type`, `price`],
    },

    // done customers
    Customers: {
        TABLE_NAME: `customers`,
        PRIMARY_KEY: `cus_id`,
        COLUMN_NAME: [`first_name`, `last_name`, `phone`, `email`, `address`, `gender`, `dateOfBirth`],
    },

    // done decor_details
    Decor_Details: {
        TABLE_NAME: `decor_details`,
        PRIMARY_KEY: `decor_detail_id`,
        COLUMN_NAME: [`decor_id`, `unit_price`, `quantity`, `total_price`],
    },

    // done decors
    Decors: {
        TABLE_NAME: `decors`,
        PRIMARY_KEY: `decor_id`,
        COLUMN_NAME: [`decor_category_id`, `description`, `price`],
    },

    // done decor_categories
    Decor_Categories: {
        TABLE_NAME: `decor_categories`,
        PRIMARY_KEY: `decor_category_id`,
        COLUMN_NAME: [`type`],
    },

    // done des_products
    Des_Products: {
        TABLE_NAME: `des_products`,
        PRIMARY_KEY: `des_prod_id`,
        COLUMN_NAME: [
            `cus_id`,
            `decor_detail_id`,
            `category_id`,
            `size_id`,
            `shape_id`,
            `flavour_id`,
            `name`,
            `price`,
        ],
    },

    // done flavours
    Flavours: {
        TABLE_NAME: `flavours`,
        PRIMARY_KEY: `flavour_id`,
        COLUMN_NAME: [`flavour`, `price`],
    },

    // done order_des_prod_details
    Order_Des_Prod_Details: {
        TABLE_NAME: `order_des_prod_details`,
        PRIMARY_KEY: `order_id`,
        COLUMN_NAME: [`des_prod_quantity`],
    },

    // done order_prod_details
    Order_Prod_Details: {
        TABLE_NAME: `order_prod_details`,
        PRIMARY_KEY: `order_id`,
        COLUMN_NAME: [`prod_quantity`],
    },

    // done orders
    Orders: {
        TABLE_NAME: `orders`,
        PRIMARY_KEY: `order_id`,
        COLUMN_NAME: [`cus_id`, `delivery_status`, `total_unit`, `total_origin_price`, `total_price`],
    },

    // done products
    Products: {
        TABLE_NAME: `products`,
        PRIMARY_KEY: `prod_id`,
        COLUMN_NAME: [
            `category_id`,
            `shape_id`,
            `size_id`,
            `flavour_id`,
            `name`,
            `quantity`,
            `image`,
            `price`,
            `originPrice`,
            `status`,
        ],
    },

    // done shapes
    Shapes: {
        TABLE_NAME: `shapes`,
        PRIMARY_KEY: `shape_id`,
        COLUMN_NAME: [`shape`, `price`],
    },

    // done sizes
    Sizes: {
        TABLE_NAME: `sizes`,
        PRIMARY_KEY: `size_id`,
        COLUMN_NAME: [`size`, `price`],
    },

    // done total
    Total: {
        TABLE_NAME: `total`,
        PRIMARY_KEY: `total_id`,
        COLUMN_NAME: [`total_price_daily`],
    },

    // done total_detail
    Total_Detail: {
        TABLE_NAME: `sizes`,
        PRIMARY_KEY: [`total_id`, `order_id`],
        COLUMN_NAME: [],
    },

    // done products_view
    Products_View: {
        TABLE_NAME: `products_view`,
        PRIMARY_KEY: `prod_id`,
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
};

export default ENTITIES;
