const QUERY_CATEGORIES = {
	SELECT_CATEGORIES: `
        SELECT *
        FROM categories
        ORDER BY created_at DESC
    `,

	SELECT_CATEGORY: `
        SELECT *
        FROM categories
        WHERE category _id = ?
    `,

	CREATE_CATEGORY: `
        INSERT INTO categories (type)
        VALUES (?)
    `,

	UPDATE_CATEGORY: `
        UPDATE categories
        SET type = ?
    `,

	DELETE_CATEGORY: `
        DELETE FROM categories
        WHERE category _id = ?
    `,
};

export default QUERY_CATEGORIES;
