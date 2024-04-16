const QUERY_DECORS = {
    SELECT_DECORS: "SELECT * FROM `decors`",
    SELECT_DECOR: "SELECT * FROM `decors` WHERE `decor_id` = ?",
    CREATE_DECOR: "INSERT INTO `decors` (`description`, `price`) VALUES (?, ?)",
    UPDATE_DECOR: "UPDATE `decors` SET `description` = ?, `price` = ? WHERE `decor_id` = ?",
    DELETE_DECOR: "DELETE FROM `decors` WHERE `decor_id` = ?",
};

export default QUERY_DECORS;
