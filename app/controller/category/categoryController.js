const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../validation/category/categoryValidator');
const Response = require('../../../utils/response');
const categoryModule = require('../../model/category/category');

// get all users
router.get('/', async (req, res) => {
	const response = new Response(res);
	
	try {
		const getAll = await categoryModule.getAll();

		return response.content(getAll);
	} catch (error) {
		return response.internalServerError(error);
	}
})


module.exports = router;