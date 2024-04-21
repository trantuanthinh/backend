const QUERY_SERVICE = {
    getAllQuery: function (tableName) {
        return `SELECT * FROM ${tableName}`;
    },

    getItemQuery: function (tableName, keyName, id) {
        return `SELECT * FROM ${tableName} WHERE ${keyName} = ?`;
    },

    createItemQuery: function (tableName, columnNames, columnValues) {
        return `INSERT INTO ${tableName} (${columnNames}) VALUES (${columnValues})`;
    },

    updateItemQuery: function (tableName, columnNames, columnValues) {
        // const setClause = columnNames.map((columnName, index) => `\`${columnName}\` = ?`).join(', ');
        // return `UPDATE ${tableName} SET ${setClause} WHERE \`ad_id\` = ?`;
    },

    deleteItemQuery: function (tableName, keyName, id) {
        return `DELETE FROM ${tableName} WHERE ${keyName} = ?`;
    }
};

export default QUERY_SERVICE;
