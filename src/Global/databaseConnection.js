import mysql from "mysql2";
import dbConfig from "../config/db.config.js";
import logger from "../util/logger.js";

// Create a MySQL connection pool
const pool = mysql.createPool({
	database: dbConfig.DB,
	host: dbConfig.HOST,
	port: dbConfig.PORT,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	connectionLimit: dbConfig.pool.max,
	queryFormat: function (query, values) {
		if (!values) return query;
		return query.replace(
			/\:(\w+)/g,
			function (txt, key) {
				if (values.hasOwnProperty(key)) {
					return this.escape(values[key]);
				}
				return txt;
			}.bind(this),
		);
	},
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

// Export the pool
export default pool;
