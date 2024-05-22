//done
const ENTITIES = {
    //1. done admins
    Admins: {
        TABLE_NAME: `admins`,
        PRIMARY_KEY: `ad_id`,
        COLUMN_NAME: [`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`],
    },

    //2. done categories
    Categories: {
        TABLE_NAME: `categories`,
        PRIMARY_KEY: `category_id`,
        COLUMN_NAME: [`type`, `price`],
    },

    //3. done customers
    Customers: {
        TABLE_NAME: `customers`,
        PRIMARY_KEY: `cus_id`,
        COLUMN_NAME: [`first_name`, `last_name`, `phone`, `email`, `address`, `gender`, `dateOfBirth`],
    },

    //4. done decor_details
    Decor_Details: {
        TABLE_NAME: `decor_details`,
        PRIMARY_KEY: `decor_detail_id`,
        COLUMN_NAME: [`decor_id`, `unit_price`, `quantity`, `total_price`],
    },

    //5. done decors
    Decors: {
        TABLE_NAME: `decors`,
        PRIMARY_KEY: `decor_id`,
        COLUMN_NAME: [`description`, `price`],
    },

    //6. done des_products
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

    //7. done flavours
    Flavours: {
        TABLE_NAME: `flavours`,
        PRIMARY_KEY: `flavour_id`,
        COLUMN_NAME: [`flavour`, `price`],
    },

    // 8. done order_des_prod_details
    Order_Des_Prod_Details: {
        TABLE_NAME: `order_des_prod_details`,
        PRIMARY_KEY: [`order_id`, `des_prod_id`],
        COLUMN_NAME: [`des_prod_quantity`],
    },

    // 9. done order_prod_details
    Order_Prod_Details: {
        TABLE_NAME: `order_prod_details`,
        PRIMARY_KEY: [`order_id`, `prod_id`],
        COLUMN_NAME: [`prod_quantity`],
    },

    //10. done orders
    Orders: {
        TABLE_NAME: `orders`,
        PRIMARY_KEY: `order_id`,
        COLUMN_NAME: [`cus_id`, `delivery_status`, `total_unit`, `total_price`],
    },

    //11. done products
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

    //12. done shapes
    Shapes: {
        TABLE_NAME: `shapes`,
        PRIMARY_KEY: `shape_id`,
        COLUMN_NAME: [`shape`, `price`],
    },

    //13. done sizes
    Sizes: {
        TABLE_NAME: `sizes`,
        PRIMARY_KEY: `size_id`,
        COLUMN_NAME: [`size`, `price`],
    },

    //14. done total
    Total: {
        TABLE_NAME: `total`,
        PRIMARY_KEY: `total_id`,
        COLUMN_NAME: [`total_price_daily`],
    },

    //15. done total_detail
    Total_Detail: {
        TABLE_NAME: `sizes`,
        PRIMARY_KEY: [`total_id`, `order_id`],
        COLUMN_NAME: [],
    },
};

export default ENTITIES;
