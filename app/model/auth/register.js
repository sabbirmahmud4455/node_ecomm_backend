const db = require('../../../db');
const tableName = 'users'

const register = async (name, email, phone, passwordHash) => {
    const sql = `INSERT INTO ${tableName} (name, email, phone, password) VALUE ('${name}', '${email}', '${phone}', '${passwordHash}')`;

    return await db.query(sql);
}

module.exports = {
    register
}