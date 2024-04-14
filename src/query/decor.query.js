const QUERY_DECORS = {
    SELECT_DECORS: "SELECT * FROM Decor ORDER BY created_at DESC",
    SELECT_DECOR: "SELECT * FROM Decor WHERE decor_id = ?",
    CREATE_DECOR: "INSERT INTO Decor (fruits, stickers, candles, message) VALUES (?, ?, ?, ?)",
    UPDATE_DECOR: "UPDATE Decor SET fruits = ?, stickers = ?, candles = ?, message = ? WHERE decor_id = ?",
    DELETE_DECOR: "DELETE FROM Decor WHERE decor_id = ?",
};

export default QUERY_DECORS;
