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

    // getProductDetailQuery: function (tableName) {
    //     return `SELECT p.*, c.type AS category_type, c.price as category_price, sh.shape, sh.price as shape_price, si.price as size_price, f.flavour, f.price as flavour_price
    //     FROM products AS p
    //     INNER JOIN categories AS c ON p.category_id = c.category_id
    //     INNER JOIN shapes AS sh ON p.shape_id = sh.shape_id
    //     INNER JOIN sizes AS si ON p.size_id = si.size_id
    //     INNER JOIN flavours AS f ON p.flavour_id = f.flavour_id
    //     WHERE p.prod_id = ?`;
    // },

    getProductsByCategoryIDQuery: function () {
        return `SELECT * FROM products_view WHERE category_id = ?`;
    },
};

export default QUERY_SERVICE;
