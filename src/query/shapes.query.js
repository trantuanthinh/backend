const QUERY_SHAPES = {
    SELECT_SHAPES: "SELECT * FROM `shapes`",
    SELECT_SHAPE: "SELECT * FROM `shapes` WHERE `shape_id` = ?",
    CREATE_SHAPE: "INSERT INTO `shapes` (`shape`, `price`) VALUES (?, ?)",
    UPDATE_SHAPE: "UPDATE `shapes` SET `shape` = ?, `price` = ? WHERE `shape_id` = ?",
    DELETE_SHAPE: "DELETE FROM `shapes` WHERE `shape_id` = ?",
};

export default QUERY_SHAPES;
