const db = require('../../../db');
const tableName = 'categories';
const idColumn = 'id'


// create your model methods here
// ** you may create different model for different db table

const getAll = async () => {

	const sql = 
	`SELECT c.*, c1.name as parent_name
	FROM ${tableName} c
	LEFT JOIN ${tableName} c1
		ON c.id = c1.parent_id
		ORDER BY c.position ASC
		`;

 	const data = await db.query(sql);

	return data;
}

const find = async (id) => {
	const sql = `SELECT * FROM ${tableName} WHERE ${idColumn}='${id}'`
	const user = await db.query(sql);

	return user;
}

const store = async (name, email, phone, passwordHash) => {
	const sql = `INSERT INTO ${tableName} (name, email, phone, password) VALUE ('${name}', '${email}', '${phone}', '${passwordHash}')`
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

const paginate = async (req, paginate) => {
	let query_page = req.query.page
	let page = paginate > 0 && query_page && query_page > 1 ? query_page : 1
	let offset = paginate && page ? paginate * (page - 1) : 0

	const count = await db.query(`SELECT  COUNT(*) as "NumberOfRows" FROM ${tableName}`);
	const total_pages = count[0].NumberOfRows / paginate;
	let links = []

	for (let index = 0; index < total_pages; index++) {
		const page_count = index + 1
		const query_perms = page_count > 1 ? `?page=${index + 1}` : ''

		const paginate_item = {
			"url" : `${req.headers.host+req.originalUrl+query_perms}`,
			"label" : page_count,
		};
		links.push(paginate_item);
	}

	const sql = 
	`SELECT 
		id,
		name,
		email,
		phone,
		image,
		role_id
	
		FROM ${tableName}
		LIMIT ${paginate}
		OFFSET ${offset}`;

 	let users = await db.query(sql);

	 if (total_pages > 1) {
		users = {
			"current_page" : page,
			"data" : users,
			"first_page_url" : links && links[0] ? links[0].url : null,
			"last_page" : links && links.slice(-1)[0] ? links.slice(-1)[0].label : null,
			"last_page_url" : links && links.slice(-1)[0] ? links.slice(-1)[0].url : null,
			"links" : links,
			"next_page_url" : links && links[page] ? links[page].url : null,
			"path" : '',
			"per_page" : paginate,
			"prev_page_url" : '',
			"total" : count[0].NumberOfRows,
		}
	}
	return users;
}

module.exports = {
	getAll,
	find, 
	store,
	update,
	destroy,
	paginate
}
	
	
	
