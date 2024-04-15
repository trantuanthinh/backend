const QUERY_DECORS = {
    SELECT_DECORS: "SELECT * FROM `decor` ORDER BY `created_at` DESC",
    SELECT_DECOR: "SELECT * FROM `decor` WHERE `decor_id` = ?",
    CREATE_DECOR: "INSERT INTO `decor` (`fruits`, `stickers`, `candles`, `message`) VALUES (?, ?, ?, ?)",
    UPDATE_DECOR: "UPDATE `decor` SET `fruits` = ?, `stickers` = ?, `candles` = ?, `message` = ? WHERE `decor_id` = ?",
    DELETE_DECOR: "DELETE FROM `decor` WHERE `decor_id` = ?",
};

export default QUERY_DECORS;
