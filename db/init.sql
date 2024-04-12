CREATE DATABASE IF NOT EXISTS 3t;

USE 3t;

CREATE TABLE IF NOT EXISTS admin_acc (
  `acc_id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `user_name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NULL,
  PRIMARY KEY (`acc_id`)
);

CREATE TABLE IF NOT EXISTS customers (
  `cus_id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `phone` INT NOT NULL,
  `email` VARCHAR(255) NULL,
  PRIMARY KEY (`cus_id`)
);

CREATE TABLE IF NOT EXISTS decor (
  `decor_id` INT NOT NULL AUTO_INCREMENT,
  `fruits` VARCHAR(255) NULL,
  `stickes` VARCHAR(255) NULL,
  `candles` INT NULL,
  `message` VARCHAR(255) NULL,
  PRIMARY KEY (`decor_id`)
);

CREATE TABLE IF NOT EXISTS categories (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NULL,
  PRIMARY KEY (`category_id`)
);

CREATE TABLE IF NOT EXISTS products (
  `prod_id` INT NOT NULL AUTO_INCREMENT,
  `decor_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(255) NOT NULL,
  `price` VARCHAR(255) NOT NULL,
  `image` BLOB NOT NULL,
  `quantity` VARCHAR(255) NULL,
  `size` INT NULL,
  `shape` INT NULL,
  PRIMARY KEY (`prod_id`),
  FOREIGN KEY (`decor_id`) REFERENCES decor(`decor_id`),
  FOREIGN KEY (`category_id`) REFERENCES categories(`category_id`)
);

CREATE TABLE IF NOT EXISTS des_products (
  `des_prod_id` INT NOT NULL AUTO_INCREMENT,
  `cus_id` INT NOT NULL,
  `decor_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(255) NOT NULL,
  `shape` INT NOT NULL,
  `size` INT NOT NULL,
  PRIMARY KEY (`des_prod_id`),
  FOREIGN KEY (`cus_id`) REFERENCES customers(`cus_id`),
  FOREIGN KEY (`decor_id`) REFERENCES decor(`decor_id`),
  FOREIGN KEY (`category_id`) REFERENCES categories(`category_id`)
);

CREATE TABLE IF NOT EXISTS orders (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `cus_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `delivery_status` VARCHAR(255) NOT NULL,
  `total_price` DOUBLE NOT NULL,
  `total_unit` DOUBLE NOT NULL,
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`cus_id`) REFERENCES customers(`cus_id`)
);

CREATE TABLE IF NOT EXISTS order_detail (
  `order_id` INT NOT NULL,
  `prod_id` INT NOT NULL,
  `des_prod_id` INT NOT NULL,
  PRIMARY KEY (`order_id`, `prod_id`, `des_prod_id`),
  FOREIGN KEY (`order_id`) REFERENCES orders(`order_id`),
  FOREIGN KEY (`prod_id`) REFERENCES products(`prod_id`),
  FOREIGN KEY (`des_prod_id`) REFERENCES des_products(`des_prod_id`)
);