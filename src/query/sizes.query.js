const QUERY_SIZES = {
    SELECT_SIZES: "SELECT * FROM `sizes`",
    SELECT_SIZE: "SELECT * FROM `sizes` WHERE `size_id` = ?",
    CREATE_SIZE: "INSERT INTO `sizes` (`size`, `price`) VALUES (?, ?)",
    UPDATE_SIZE: "UPDATE `sizes` SET `size` = ?, `price` = ? WHERE `size_id` = ?",
    DELETE_SIZE: "DELETE FROM `sizes` WHERE `size_id` = ?",
};

export default QUERY_SIZES;
