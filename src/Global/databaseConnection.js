import dotenv from 'dotenv';
import mysql from 'mysql2';
import dbConfig from "../config/db.config.js";
import logger from "../util/logger.js";

dotenv.config();
const pool = mysql.createPool({
	host: dbConfig.HOST,
	port: dbConfig.PORT,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB_NAME,
	connectionLimit: dbConfig.pool.max,
});

// Test the connection
pool.getConnection((err, connection) => {
	if (err) {
		logger.error("Error connecting to the database: " + err.message);
	} else {
		logger.info("Connected to the database using Pool, DB_PORT: " + dbConfig.PORT);
		connection.release();
	}
});

export default pool;
