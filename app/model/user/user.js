const db = require('../../../db');
const tableName = 'users';
const idColumn = 'userId'


// create your model methods here
// ** you may create different model for different db table

const getAll = async () => {

	const sql = `SELECT * FROM ${tableName}`;

 	const users = await db.query(sql);

	return users;
}

const find = async (id) => {
	const sql = `SELECT * FROM ${tableName} WHERE ${idColumn}=${db.escape(id)}`
	const user = await db.query(sql);

	return user;
}

const store = async (username, password) => {
	
	const sql = `INSERT INTO ${tableName} VALUES (null,?,?);`
	return await db.query(sql, [username, password]);

}

const update = async (userName, password) => {
	return 'update'
}

module.exports = {
	getAll,
	find, 
	store,
	update
}
	
	
	
