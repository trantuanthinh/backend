const QUERY_ADMINS = {
	SELECT_ADMIN: "SELECT * FROM `admin` ORDER BY created_at DESC",
	SELECT_ADMIN_ACC: "SELECT * FROM `admin` WHERE `ad_id` = ?",
	CREATE_ADMIN_ACC: "INSERT INTO `admin` (`user_name`, `password`, first_name, last_name, phone, email) VALUES (?, ?, ?, ?, ?, ?)",
	UPDATE_ADMIN_ACC: "UPDATE `admin` SET `user_name` = ?, `password` = ?, `first_name` = ?, `last_name` = ?, `phone` = ?, `email` = ? WHERE `ad_id` = ?",
	DELETE_ADMIN_ACC: "DELETE FROM `admin` WHERE `ad_id` = ?",
};

export default QUERY_ADMINS;
