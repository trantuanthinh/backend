import QUERY_SERVICE from "../service/query.service.js";

// const QUERY_ADMINS = {
// 	SELECT_ADMIN: "SELECT * FROM `admins`",
// 	SELECT_ADMIN: "SELECT * FROM `admins` WHERE `ad_id` = ?",
// 	CREATE_ADMIN: "INSERT INTO `admins` (`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`) VALUES (?, ?, ?, ?, ?, ?)",
// 	UPDATE_ADMIN: "UPDATE `admins` SET `user_name` = ?, `password` = ?, `first_name` = ?, `last_name` = ?, `phone` = ?, `email` = ? WHERE `ad_id` = ?",
// 	DELETE_ADMIN: "DELETE FROM `admins` WHERE `ad_id` = ?"
// };

const QUERY_ADMINS = {
	SELECT_ADMINS: QUERY_SERVICE.getAllQuery("admins"),
	SELECT_ADMIN: QUERY_SERVICE.getItemQuery("admins", "ad_id", "?"),
	CREATE_ADMIN: QUERY_SERVICE.createItemQuery(
		"admins",
		"`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`",
		("?", "?", "?", "?", "?", "?")
	),
	UPDATE_ADMIN: QUERY_SERVICE.updateItemQuery(
		"admins",
		("user_name", "password", "first_name", "last_name", "phone", "email"),
		("?", "?", "?", "?", "?", "?"),
	),
	DELETE_ADMIN: QUERY_SERVICE.deleteItemQuery("admins", "ad_id", "?"),
};

export default QUERY_ADMINS;
