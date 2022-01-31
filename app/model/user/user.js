const db = require('../../../db');
const tableName = 'users';
const idColumn = 'id'


// create your model methods here
// ** you may create different model for different db table

const getAll = async () => {

	const sql = 
	`SELECT 
		id,
		name,
		email,
		phone,
		image,
		role_id
	
	FROM ${tableName}`;

 	const users = await db.query(sql);

	return users;
}

const find = async (id) => {
	const sql = `SELECT * FROM ${tableName} WHERE ${idColumn}=${db.escape(id)}`
	const user = await db.query(sql);

	return user;
}

const store = async (name, email, phone, password) => {
	const sql = `INSERT INTO users (name, email, phone, password) VALUE ('${name}', '${email}', '${phone}', '${password}')`
	return await db.query(sql);
}

const update = async (id ,name, email, phone) => {
	const sql = `
		UPDATE ${tableName} SET 
			name = '${name}',
			email = '${email}',
			phone = '${phone}'
		WHERE id = ${id}
	`;

	return await db.query(sql);
}

const destroy = async (id) => {
	const sql = `DELETE FROM ${tableName} WHERE id = ${id}`;

	return await db.query(sql);
}

module.exports = {
	getAll,
	find, 
	store,
	update,
	destroy
}
	
	
	
