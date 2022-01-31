const db = require('../../../db');
const tableName = 'users'

const login = async (email, password) => {
    const sql = `SELECT id, name, email 
                FROM users 
                WHERE  email ='${email}'
                AND password = '${password}'`;

    return await db.query(sql);
}

module.exports = {
    login
}