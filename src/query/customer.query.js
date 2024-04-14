const QUERY_CUSTOMERS = {
    SELECT_CUSTOMERS: "SELECT * FROM customers ORDER BY created_at DESC",
    SELECT_CUSTOMER: "SELECT * FROM customers WHERE cus_id = ?",
    CREATE_CUSTOMER: "INSERT INTO customers (first_name, last_name, phone, email) VALUES (?, ?, ?, ?)",
    UPDATE_CUSTOMER: "UPDATE customers SET first_name = ?, last_name = ?, phone = ?, email = ? WHERE cus_id = ?",
    DELETE_CUSTOMER: "DELETE FROM customers WHERE cus_id = ?",
};

export default QUERY_CUSTOMERS;
