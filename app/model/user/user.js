const db = require('../../../db');
const tableName = 'users';
const idColumn = 'id'


// create your model methods here
// ** you may create different model for different db table

const getAll = async () => {

	// const limit = 2;

	// const sss = `SELECT COUNT(*) FROM users WHERE is_active = '1'`;

	// const count = await db.query(sss);

	// const pages = parseInt(count) / parseInt(limit)

	// const paginate = [];

	// for (let index = 0; index < pages.length; index++) {
	// 	const arr = {
	// 		page: index + 1,
	// 		limit: limit,
	// 		offset: index * parseInt(limit)
	// 	}
		

	// 	paginate.push(arr);
	// }


	// return paginate

	// console.log(paginate);


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

const store = async (name, email, phone, passwordHash) => {
	const sql = `INSERT INTO users (name, email, phone, password) VALUE ('${name}', '${email}', '${phone}', '${passwordHash}')`
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
	
	
	
