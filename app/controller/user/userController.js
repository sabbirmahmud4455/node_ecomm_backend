const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../validation/user/userValidator');
const Response = require('../../../utils/response');
const { response } = require('express');

const userModule = require('../../model/user/user');

// get all users
router.get('/', async (req, res) => {
	const getAll = await userModule.getAll();	
	res.json(getAll);
})


//find user by id
router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const user = await userModule.find(id);
	res.json(user);
})

//create user
router.post('/', async (req, res) => {

  const response = new Response(res)

  try {
	const {data, error} = validateRequest (req, 'create');

	if(error) return response.badRequest(error);

	const {userName, password} = data;


	const user = await userModule.store(userName, password)


	return res.json(user);

	// return response.created(user);

  } catch (error) {
	const message = error.message ? error.message : 'Server error';
    response.internalServerError({ message });
  }

})


// update user by id
router.put('/update/:id', async (req, res) => {
	const response = new Response(res);
	const id = req.params.id;

	try {

		const {data , error } =  validateRequest(req, 'update');

		if (error) return response.badRequest(error);

		const {userName, password} = data;

		const user = await userModule.find(id);

		if (user.length == 0) return response.notFound('user not found')

	    const update = await userModule.update(id ,userName, password);

		return response.ok(update);


	} catch (error) {
		return response.internalServerError(error);
	}


})


// require your models here


// sample post method
// router.post('/', async (req, res) => {
//   const response = new Response(res);
//   try {
//     validate request to check user input errors
//     call model methods
//     send response to client
//   } catch (error) {
//     send error response to client
//   }
// });

module.exports = router;