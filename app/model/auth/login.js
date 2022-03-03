const db = require('../../../db');
const tableName = 'users'

const login = async (email) => {
    const sql = `SELECT id, name, email , password
                FROM users 
                WHERE  email ='${email}' AND is_active = '1'
                LIMIT 1
                `;

    return await db.query(sql);
}

module.exports = {
    login
}