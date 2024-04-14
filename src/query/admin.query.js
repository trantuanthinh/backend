const QUERY_ADMINS = {
	SELECT_ADMIN_ACCS: "SELECT * FROM admin_acc ORDER BY created_at DESC",
	SELECT_ADMIN_ACC: "SELECT * FROM admin_acc WHERE acc_id = ?",
	CREATE_ADMIN_ACC: "INSERT INTO admin_acc (user_name, password, first_name, last_name, phone, email) VALUES (?, ?, ?, ?, ?, ?)",
	UPDATE_ADMIN_ACC: "UPDATE admin_acc SET user_name = ?, password = ?, first_name = ?, last_name = ?, phone = ?, email = ? WHERE acc_id = ?",
	DELETE_ADMIN_ACC: "DELETE FROM admin_acc WHERE acc_id = ?",
};

export default QUERY_ADMINS;
