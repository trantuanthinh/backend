const QUERY_FLAVOURS = {
    SELECT_FLAVOURS: "SELECT * FROM `flavours`",
    SELECT_FLAVOUR: "SELECT * FROM `flavours` WHERE `flavour_id` = ?",
    CREATE_FLAVOUR: "INSERT INTO `flavours` (`flavour`, `price`) VALUES (?, ?)",
    UPDATE_FLAVOUR: "UPDATE `flavours` SET `flavour` = ?, `price` = ? WHERE `flavour_id` = ?",
    DELETE_FLAVOUR: "DELETE FROM `flavours` WHERE `flavour_id` = ?",
};

export default QUERY_FLAVOURS;
