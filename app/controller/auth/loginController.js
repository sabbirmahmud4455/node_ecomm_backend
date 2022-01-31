require('dotenv').config();
const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../validation/auth/loginValidator');
const Response = require('../../../utils/response');
const loginModel = require('../../model/auth/login');
const jwt = require('jsonwebtoken');



router.post('/', async (req, res) => {
    const response = new Response(res);

    try {
        const {data, error} = validateRequest(req, 'login');

        if (error) return response.badRequest(error);
        
        const {email, password} = data;

    
        // const login_user = await loginModel.login(email, password)
        const login_user = {name: 'helkadf' };

        

        // process.env.ACCESS_TOKEN_SECRET = 'hello';

        if (user.length == 0) return response.notFound('user not found');

        const jwt_tt = jwt.sign({user: login_user}, 'secreteKey', (err, token) => {
            res.json({
                token
            })
        });

        return res.json(jwt_tt);

    } catch (error) {
        return response.internalServerError(error);
    }

})


module.exports = router;