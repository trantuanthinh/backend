const QUERY_SERVICE = {
    getAllQuery: function (tableName) {
        return `SELECT * FROM \`${tableName}\``;
    },

    getItemQuery: function (tableName, keyName) {
        return `SELECT * FROM \`${tableName}\` WHERE \`${keyName}\` = ?`;
    },

    createItemQuery: function (tableName, columnNames) {
        let columnClause = "";
        let valueClause = "";
        for (let i = 0; i < columnNames.length; i++) {
            if (i === columnNames.length - 1) {
                valueClause += "?";
                columnClause += `\`${columnNames[i]}\``;
            } else {
                valueClause += "?, ";
                columnClause += `\`${columnNames[i]}\`, `;
            }
        }
        return `INSERT INTO \`${tableName}\` (${columnClause}) VALUES (${valueClause})`;
    },

    updateItemQuery: function (tableName, keyName, columnNames) {
        let clause = "";
        for (let i = 0; i < columnNames.length; i++) {
            if (i === columnNames.length - 1) {
                clause += `\`${columnNames[i]}\` = ?`;
            } else {
                clause += `\`${columnNames[i]}\` = ?, `;
            }
        }
        return `UPDATE ${tableName} SET ${clause} WHERE \`${keyName}\` = ?`;
    },

    deleteItemQuery: function (tableName, keyName) {
        return `DELETE FROM ${tableName} WHERE ${keyName} = ?`;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getLastItemQuery: function (tableName, keyName) {
        return `SELECT * FROM \`${tableName}\` ORDER BY \`${keyName}\` DESC LIMIT 1;`;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getProductsByCategoryIdQuery: function () {
        return `SELECT * FROM products_view WHERE category_id = ?`;
    },

    // getDecorByCategoryQuery: function () {
    //     return `SELECT * FROM decors_view WHERE type = ?`;
    // },
};

export default QUERY_SERVICE;
