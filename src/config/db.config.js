import dotenv from "dotenv";

dotenv.config();

// Database connection configuration
const dbConfig = {
	dialect: process.env.DB,
	HOST: process.env.DB_HOST,
	PORT: process.env.DB_PORT,
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASSWORD,
	DB: process.env.DB_NAME,
	pool: {
		max: process.env.DB_CONNECTION_LIMIT,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

export default dbConfig;
