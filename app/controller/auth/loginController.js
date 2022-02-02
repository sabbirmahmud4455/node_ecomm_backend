require('dotenv').config();
const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../validation/auth/loginValidator');
const Response = require('../../../utils/response');
const loginModel = require('../../model/auth/login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



router.post('/', async (req, res) => {
    const response = new Response(res);

    // return res.json(req.body)

    const {data, error} = validateRequest(req, 'login');

    if (error) return response.badRequest(error);

    try {
        
        const {email, password} = data;

        const login_user = await loginModel.login(email)

        // process.env.ACCESS_TOKEN_SECRET = 'hello';

        if (login_user.length == 0) return response.notFound('user not found');

        const verified = bcrypt.compareSync(password, login_user[0].password);

        if (verified == false) response.badRequest('Password not match');

        const user = {
            id: login_user[0].id,
            name: login_user[0].name,
            email: login_user[0].email,
        }

        jwt.sign({user: user}, 'asddsfasdff', {expiresIn: '10000s'}, (err, token) => {

            if (err) return res.json(err);

            res.header(
                'authenticationToken', "hello "+ token
            ).send(token);
        });

    } catch (error) {
        return response.internalServerError(error);
    }

})


module.exports = router;