-- Active: 1713164906685@@127.0.0.1@3306@3t
-- INIT DATABASE --------------------------------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS 3t;
USE 3t;





-- INIT TABLES ----------------------------------------------------------------------------------------------------
-- init table admins: DONE
CREATE TABLE IF NOT EXISTS `admins` (
    `ad_id` INT NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `user_name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`ad_id`)
);
-- init table customers: DONE
CREATE TABLE IF NOT EXISTS `customers` (
    `cus_id` INT NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NULL,
    `dateOfBirth` DATE NULL,
    CONSTRAINT `gender_status_check` CHECK (`gender` IN ('male' , 'female')),
    PRIMARY KEY (`cus_id`)
);
-- init table decor_categories: DONE
CREATE TABLE IF NOT EXISTS `decor_categories` (
    `decor_category_id` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`decor_category_id`)
);
-- init table decors: DONE
CREATE TABLE IF NOT EXISTS `decors` (
    `decor_id` INT NOT NULL AUTO_INCREMENT,
    `decor_category_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10 , 2 ) NOT NULL,
    PRIMARY KEY (`decor_id`),
    FOREIGN KEY (`decor_category_id`)
        REFERENCES `decor_categories` (`decor_category_id`)
);
-- init table shapes: DONE
CREATE TABLE IF NOT EXISTS `shapes` (
    `shape_id` INT NOT NULL AUTO_INCREMENT,
    `shape` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10 , 2 ) NOT NULL,
    PRIMARY KEY (`shape_id`)
);
-- init table sizes: DONE
CREATE TABLE IF NOT EXISTS `sizes` (
    `size_id` INT NOT NULL AUTO_INCREMENT,
    `size` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10 , 2 ) NOT NULL,
    PRIMARY KEY (`size_id`)
);
-- init table flavours: DONE
CREATE TABLE IF NOT EXISTS `flavours` (
    `flavour_id` INT NOT NULL AUTO_INCREMENT,
    `flavour` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10 , 2 ) NOT NULL,
    PRIMARY KEY (`flavour_id`)
);
-- init table categories: DONE
CREATE TABLE IF NOT EXISTS `categories` (
    `category_id` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10 , 2 ) NOT NULL,
    PRIMARY KEY (`category_id`)
);
-- init table products: DONE
CREATE TABLE IF NOT EXISTS `products` (
    `prod_id` INT NOT NULL AUTO_INCREMENT,
    `category_id` INT NOT NULL,
    `shape_id` INT NOT NULL,
    `size_id` INT NOT NULL,
    `flavour_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `name` VARCHAR(255) NOT NULL,
    `quantity` INT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10 , 2 ) NOT NULL,
    `originPrice` DECIMAL(10 , 2 ) NOT NULL,
    `status` VARCHAR(8) NOT NULL,
    CONSTRAINT `status_check` CHECK (`status` IN ('active' , 'inactive')),
    PRIMARY KEY (`prod_id`),
    FOREIGN KEY (`category_id`)
        REFERENCES `categories` (`category_id`),
    FOREIGN KEY (`shape_id`)
        REFERENCES `shapes` (`shape_id`),
    FOREIGN KEY (`size_id`)
        REFERENCES `sizes` (`size_id`),
    FOREIGN KEY (`flavour_id`)
        REFERENCES `flavours` (`flavour_id`)
);
-- init table des_products: DONE
CREATE TABLE IF NOT EXISTS `des_products` (
    `des_prod_id` INT NOT NULL AUTO_INCREMENT,
    `category_id` INT NOT NULL,
    `shape_id` INT NOT NULL,
    `size_id` INT NOT NULL,
    `flavour_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10 , 2 ) NOT NULL,
    PRIMARY KEY (`des_prod_id`),
    FOREIGN KEY (`category_id`)
        REFERENCES `categories` (`category_id`),
    FOREIGN KEY (`shape_id`)
        REFERENCES `shapes` (`shape_id`),
    FOREIGN KEY (`size_id`)
        REFERENCES `sizes` (`size_id`),
    FOREIGN KEY (`flavour_id`)
        REFERENCES `flavours` (`flavour_id`)
);
-- init table decor_prod_details: DONE
CREATE TABLE IF NOT EXISTS `decor_prod_details` (
    `prod_id` INT NOT NULL,
    `decor_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    FOREIGN KEY (`prod_id`)
        REFERENCES `products` (`prod_id`),
    FOREIGN KEY (`decor_id`)
        REFERENCES `decors` (`decor_id`),
    PRIMARY KEY (`prod_id` , `decor_id`)
);
-- init table decor_des_prod_details: DONE
CREATE TABLE IF NOT EXISTS `decor_des_prod_details` (
    `des_prod_id` INT NOT NULL,
    `decor_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    FOREIGN KEY (`des_prod_id`)
        REFERENCES `des_products` (`des_prod_id`),
    FOREIGN KEY (`decor_id`)
        REFERENCES `decors` (`decor_id`),
    PRIMARY KEY (`des_prod_id` , `decor_id`)
);
-- init table orders: DONE
CREATE TABLE IF NOT EXISTS `orders` (
    `order_id` INT NOT NULL AUTO_INCREMENT,
    `cus_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `delivery_status` VARCHAR(255) NOT NULL,
    `active_status` VARCHAR(255) NOT NULL,
    `total_unit` DECIMAL(10 , 2 ) NOT NULL,
    `total_origin_price` DECIMAL(10 , 2 ) NOT NULL,
    `total_price` DECIMAL(10 , 2 ) NOT NULL,
    CONSTRAINT `delivery_status_check` CHECK (`delivery_status` IN ('pending' , 'delivering', 'delivered')),
    CONSTRAINT `active_status_check` CHECK (`active_status` IN ('active' , 'inactive')),
    FOREIGN KEY (`cus_id`)
        REFERENCES `customers` (`cus_id`),
    PRIMARY KEY (`order_id`)
);
-- init table order_prod_details: DONE
CREATE TABLE IF NOT EXISTS `order_prod_details` (
    `order_id` INT NOT NULL,
    `prod_id` INT NOT NULL,
    `prod_quantity` INT NOT NULL,
    PRIMARY KEY (`order_id` , `prod_id`),
    FOREIGN KEY (`order_id`)
        REFERENCES `orders` (`order_id`),
    FOREIGN KEY (`prod_id`)
        REFERENCES `products` (`prod_id`)
);
-- init table order_des_prod_details: DONE
CREATE TABLE IF NOT EXISTS `order_des_prod_details` (
    `order_id` INT NOT NULL,
    `des_prod_id` INT NOT NULL,
    `des_prod_quantity` INT NOT NULL,
    PRIMARY KEY (`order_id` , `des_prod_id`),
    FOREIGN KEY (`order_id`)
        REFERENCES `orders` (`order_id`),
    FOREIGN KEY (`des_prod_id`)
        REFERENCES `des_products` (`des_prod_id`)
);
-- init table total: DONE
CREATE TABLE IF NOT EXISTS `total` (
    `total_id` INT NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `total_price_daily` DECIMAL(10 , 2 ) NOT NULL,
    PRIMARY KEY (`total_id`)
);
-- init table total_detail: DONE
CREATE TABLE IF NOT EXISTS `total_detail` (
    `total_id` INT NOT NULL,
    `order_id` INT NOT NULL,
    PRIMARY KEY (`total_id` , `order_id`),
    FOREIGN KEY (`total_id`)
        REFERENCES `total` (`total_id`),
    FOREIGN KEY (`order_id`)
        REFERENCES `orders` (`order_id`)
);
-- init view products_view: DONE
CREATE OR REPLACE VIEW `products_view` AS
    SELECT
        `p`.*,
        `c`.`type` AS `category_type`,
        `c`.`price` AS `category_price`,
        `sh`.`shape`,
        `sh`.`price` AS `shape_price`,
        `si`.`size`,
        `si`.`price` AS `size_price`,
        `f`.`flavour`,
        `f`.`price` AS `flavour_price`
    FROM
        `products` AS `p`
            INNER JOIN
        `categories` AS `c` ON `p`.`category_id` = `c`.`category_id`
            INNER JOIN
        `shapes` AS `sh` ON `p`.`shape_id` = `sh`.`shape_id`
            INNER JOIN
        `sizes` AS `si` ON `p`.`size_id` = `si`.`size_id`
            INNER JOIN
        `flavours` AS `f` ON `p`.`flavour_id` = `f`.`flavour_id`;
-- init view des_products_view: DONE
CREATE OR REPLACE VIEW `des_products_view` AS
    SELECT
        `des`.*,
        `c`.`type` AS `category_type`,
        `c`.`price` AS `category_price`,
        `sh`.`shape`,
        `sh`.`price` AS `shape_price`,
        `si`.`size`,
        `si`.`price` AS `size_price`,
        `f`.`flavour`,
        `f`.`price` AS `flavour_price`
    FROM
        `des_products` AS `des`
            INNER JOIN
        `categories` AS `c` ON `des`.`category_id` = `c`.`category_id`
            INNER JOIN
        `shapes` AS `sh` ON `des`.`shape_id` = `sh`.`shape_id`
            INNER JOIN
        `sizes` AS `si` ON `des`.`size_id` = `si`.`size_id`
            INNER JOIN
        `flavours` AS `f` ON `des`.`flavour_id` = `f`.`flavour_id`;
-- init view orders_view: DONE
CREATE OR REPLACE VIEW `orders_view` AS
    SELECT
        `o`.*, `cus`.`first_name`, `cus`.`last_name`, `cus`.`phone`
    FROM
        `orders` AS `o`
            INNER JOIN
        `customers` AS `cus` ON `o`.`cus_id` = `cus`.`cus_id`;
-- init view order_prod_detail_view: DONE
CREATE OR REPLACE VIEW `order_prod_detail_view` AS
    SELECT
        `o`.*,
        `p`.`name`,
        `p`.`image`,
        `p`.`price`,
        `p`.`originPrice`,
        `c`.`type`,
        `sh`.`shape`,
        `f`.`flavour`
    FROM
        `order_prod_details` AS `o`
            INNER JOIN
        `products` AS p ON `o`.`prod_id` = `p`.`prod_id`
            INNER JOIN
        `categories` AS c ON `p`.`category_id` = `c`.`category_id`
            INNER JOIN
        `shapes` AS `sh` ON `p`.`shape_id` = `sh`.`shape_id`
            INNER JOIN
        `sizes` AS `si` ON `p`.`size_id` = `si`.`size_id`
            INNER JOIN
        `flavours` AS `f` ON `p`.`flavour_id` = `f`.`flavour_id`;
-- init view decors_view: DONE
CREATE OR REPLACE VIEW `decors_view` AS
    SELECT
        `de`.*, `decate`.`type`
    FROM
        `decors` AS `de`
            INNER JOIN
        `decor_categories` AS `decate` ON `de`.`decor_category_id` = `decate`.`decor_category_id`;





-- INIT DATA FOR TABLES -------------------------------------------------------------------------------------------
INSERT INTO `admins` (`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`) VALUES ('admin', 'admin', 'ad', 'min', '123', 'admin@gmail.com');
INSERT INTO `admins` (`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`) VALUES ('Thinh', 'admin', 'Thinh', 'Tran', '234', 'tran.tuan.thinh.0125@gmail.com');
INSERT INTO `admins` (`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`) VALUES ('Nguyen', 'admin', 'Nguyen', 'Nguyen', '345', 'nguyen.nguyen.cit22@gmail.com');
INSERT INTO `admins` (`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`) VALUES ('My', 'admin', 'My', 'Tran', '456', 'my.tran.cit22@gmail.com');



INSERT INTO `customers` (`first_name`, `last_name`, `password`, `phone`, `email`, `address`, `gender`, `dateOfBirth`)
VALUES ('Trần Tuấn', 'Thịnh', 'trantuanthinh', '0123456789', 'thinh.tran.cit20@eiu.edu.vn', 'Bình Dương', 'male', '2002-11-05');
INSERT INTO `customers` (`first_name`, `last_name`, `password`, `phone`, `email`, `address`, `gender`, `dateOfBirth`)
VALUES ('Nguyen Minh', 'Nguyen', 'nguyenminhnguyen', '234567891', 'nguyen.nguyen.cit22@gmail.com', 'Bình Dương', 'female', '2002-01-01');
INSERT INTO `customers` (`first_name`, `last_name`, `password`, `phone`, `email`, `address`, `gender`, `dateOfBirth`)
VALUES ('Vo Thi Tra', 'My', 'vothitramy', '345678912', 'my.tran.cit22@gmail.com', 'Bình Dương', 'female', '2000-09-09');



INSERT INTO `decor_categories` (`type`) VALUES ('fruits');
INSERT INTO `decor_categories` (`type`) VALUES ('animals');
INSERT INTO `decor_categories` (`type`) VALUES ('sex');
INSERT INTO `decor_categories` (`type`) VALUES ('candles');



INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (4, 'Alphabet', "alphabet_candle.jpg", 4);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (1, 'Avocado', "avocado.jpg", 2);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (1, 'Avocado2', "avocado2.jpg", 2);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (1, 'Blueberry', "blueberry.jpg", 2);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (2, 'Bear', "bear.jpg", 2);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (2, 'Bear2', "bear2.jpg", 2);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (3, 'Boy', "boy.jpg", 3);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (2, 'Duck', "duck.jpg", 2);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (3, 'Girl', "girl.jpg", 3);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (3, 'Grandfather', "grandfather.jpg", 3);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (3, 'Grandfather2', "grandfather2.jpg", 3);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (3,'Grandmother', "grandmother.jpg", 3);
INSERT INTO `decors` (`decor_category_id`,`name`, `image`, `price`) VALUES (3,'Grandmother2', "grandmother2.jpg", 3);



INSERT INTO `sizes` (`size`, `price`) VALUES ('Small', 5);
INSERT INTO `sizes` (`size`, `price`) VALUES ('Medium', 10);
INSERT INTO `sizes` (`size`, `price`) VALUES ('Large', 15);



INSERT INTO `flavours` (`flavour`, `price`) VALUES ('strawberry', 1);
INSERT INTO `flavours` (`flavour`, `price`) VALUES ('blackberry', 2);
INSERT INTO `flavours` (`flavour`, `price`) VALUES ('blueberry', 1);
INSERT INTO `flavours` (`flavour`, `price`) VALUES ('chocolate', 1.5);
INSERT INTO `flavours` (`flavour`, `price`) VALUES ('vanilla', 1.5);



INSERT INTO `categories` (`type`, `price`) VALUES ('cake', 2.5);
INSERT INTO `categories` (`type`, `price`) VALUES ('cookie', 1.5);
INSERT INTO `categories` (`type`, `price`) VALUES ('macaron', 1);



INSERT INTO `shapes` (`shape`, `price`) VALUES ('Round', 9.9);
INSERT INTO `shapes` (`shape`, `price`) VALUES ('Square', 11.9);
INSERT INTO `shapes` (`shape`, `price`) VALUES ('Triangle', 5.5);
INSERT INTO `shapes` (`shape`, `price`) VALUES ('Heart', 6.5);
INSERT INTO `shapes` (`shape`, `price`) VALUES ('Rectangle', 12);



INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 2, 1, 'Candy Cake', 15, 'Candy-Cake.webp', "12", "9", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 3, 1, 'Orange Cake', 10, 'Orange-Cake.webp', "21", "18", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 2, 1, 'Animal Cake', 5, 'Animal-Cake.webp', "16", "10", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 5, 2, 1, 'Rabit Cake', 9, 'Rabit-Cake.webp', "15", "9", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 3, 1, 'Cherry Cake', 10, 'Cherry-Cake.webp', "10", "5", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 2, 1, 'Dog Cake', 5, 'Dog-Cake.webp', "10", "6", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 3, 2, 1, 'Strawberry Cake', 6, 'Strawberry-Cake.webp', "9", "5", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 3, 1, 'Chicken Cake', 10, 'Chicken-Cake.webp', "30", "20", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 2, 1, 'Bear Cake', 3, 'Bear-Cake.webp', "15", "8", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 2, 1, 'Stars Cake', 4, 'Stars-Cake.webp', "15", "8", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 3, 1, 'Weeding Cake', 2, 'Weeding-Cake.webp', "60", "40", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 3, 1, 'Pink Rabit Cake', 7, 'PinkRabit-Cake.webp', "25", "15", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 3, 1, 'Carrot Dog Cake', 4, 'Carrot-Dog-Cake.webp', "25", "17", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 2, 1, 'White Dog Cake', 5, 'White-Dog-Cake.webp', "27", "17", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 3, 1, 'Anime Rabit Cake', 3, 'Anime-Rabit-Cake.webp', "55", "25", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 2, 1, 'Blue Cake', 1, 'Blue-Cake.webp', "10", "5", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (1, 1, 3, 1, 'Lovely Cake', 4, 'Lovely-Cake.webp', "45", "20", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (2, 1, 3, 1, 'Vanni Cookie', 12, 'Vanni-Cookie.webp', "3", "1", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (2, 1, 1, 1, 'Four Types Cookie', 20, 'Four-Types-Cookie.webp', "2", "0.2", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (2, 1, 1, 3, 'Yellow Cookie', 50, 'Yellow-Cookie.webp', "2", "0.2", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (2, 1, 1, 3, 'Sky Cookie', 50, 'Sky-Cookie.webp', "2", "0.2", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (2, 1, 1, 1, 'Matcha Cookie', 30, 'Matcha-Cookie.webp', "5", "3", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (2, 1, 1, 1, 'Milk Cookie', 20, 'Milk-Cookie.webp', "5", "2", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (2, 1, 1, 1, 'Chocolate Cookie', 10, 'Chocolate-Cookie.webp', "5", "2", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (2, 1, 1, 1, 'Vanni Cookie', 10, 'Vanni-Cookie.webp', "5", "2", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (3, 1, 1, 1, 'Bear Macaron', 25, 'Bear-Macaron.webp', "6", "3", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (3, 1, 1, 1, 'Chicken Macaron', 30, 'Chicken-Macaron.webp', "6", "3", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (3, 1, 1, 1, 'Christmas Macaron', 30, 'Christmas-Macaron.webp', "6", "3", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (3, 1, 1, 1, 'Heart Macaron', 20, 'Heart-Macaron.webp', "6", "3", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (3, 1, 1, 1, 'Snowman Macaron', 20, 'Snowman-Macaron.webp', "6", "3", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (3, 1, 1, 1, 'Yellow Macaron', 20, 'Yellow-Macaron.webp', "6", "3", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (3, 1, 1, 1, 'Vanni Macaron', 20, 'Vanni-Macaron.webp', "6", "3", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (3, 1, 1, 1, 'Matcha Macaron', 20, 'Matcha-Macaron.webp', "6", "3", "active");
INSERT INTO `products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `quantity`, `image`, `price`, `originPrice`, `status`)
VALUES (3, 1, 1, 1, 'Joker Macaron', 20, 'Joker-Macaron.webp', "6", "3", "active");



INSERT INTO `des_products` (`category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `price`)
VALUES (1, 1, 1, 1, 'Designed Cake', 20);



INSERT INTO `decor_prod_details` (`prod_id`, `decor_id`, `quantity`) VALUES (1, 2, 3);
INSERT INTO `decor_prod_details` (`prod_id`, `decor_id`, `quantity`) VALUES (1, 4, 5);



INSERT INTO `decor_des_prod_details` (`des_prod_id`, `decor_id`, `quantity`) VALUES (1, 1, 1);
INSERT INTO `decor_des_prod_details` (`des_prod_id`, `decor_id`, `quantity`) VALUES (1, 2, 1);



-- INSERT INTO `des_products` (`cus_id`, `sdecor_detail_id`, `category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `price`)
-- VALUES (1, 1, 1, 1, 1, 1, 'Cake', 25.00);
-- INSERT INTO `des_products` (`cus_id`, `sdecor_detail_id`, `category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `price`)
-- VALUES (2, 2, 2, 2, 2, 2, 'Cookie', 10.00);
-- INSERT INTO `des_products` (`cus_id`, `sdecor_detail_id`, `category_id`, `shape_id`, `size_id`, `flavour_id`, `name`, `price`)
-- VALUES (2, 2, 1, 2, 1, 2, 'Macaron', 35.00);



INSERT INTO `orders` ( `cus_id`, `delivery_status`, `active_status`,`total_unit`,`total_origin_price`, `total_price`)
VALUES ( 1, 'pending', 'active', 2, 32, 50);
-- INSERT INTO `orders` (`order_detail_id`, `cus_id`, `delivery_status`, `total_unit`, `total_price`)
-- VALUES (2, 2, 'Shipped', 1, 35.00);
-- INSERT INTO `orders` (`order_detail_id`, `cus_id`, `delivery_status`, `total_unit`, `total_price`)
-- VALUES (3, 3, 'Delivered', 3, 30.00);



INSERT INTO `order_prod_details` (`order_id`, `prod_id`, `prod_quantity`) VALUES ( 1, 2, 4);
INSERT INTO `order_prod_details` (`order_id`, `prod_id`, `prod_quantity`) VALUES ( 1, 3, 2);
