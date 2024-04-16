const QUERY_ADMINS = {
	SELECT_ADMIN: "SELECT * FROM `admins` ORDER BY created_at DESC",
	SELECT_ADMIN_ACC: "SELECT * FROM `admins` WHERE `ad_id` = ?",
	CREATE_ADMIN_ACC: "INSERT INTO `admins` (`user_name`, `password`, `first_name`, `last_name`, `phone`, `email`) VALUES (?, ?, ?, ?, ?, ?)",
	UPDATE_ADMIN_ACC: "UPDATE `admins` SET `user_name` = ?, `password` = ?, `first_name` = ?, `last_name` = ?, `phone` = ?, `email` = ? WHERE `ad_id` = ?",
	DELETE_ADMIN_ACC: "DELETE FROM `admins` WHERE `ad_id` = ?"
};

export default QUERY_ADMINS;
