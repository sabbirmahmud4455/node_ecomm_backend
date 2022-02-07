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

    const {data, error} = validateRequest(req, 'login');

    if (error) return response.badRequest(error);

    try {
        
        const {email, password} = data;

        const login_user = await loginModel.login(email)

        if (login_user.length == 0) return response.notFound('user not found');

        const verified = bcrypt.compareSync(password, login_user[0].password);

        if (verified == false) response.badRequest('Password not match');

        const user = {
            id: login_user[0].id,
            name: login_user[0].name,
            email: login_user[0].email,
        }

        const maxAge = 60 * 60 * 24 ;

        jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: `${maxAge}s`}, (err, token) => {

            if (err) return res.json(err);

            res.cookie('jwt', "Bearer "+ token , { maxAge: maxAge * 1000 , httpOnly: true });
            res.cookie('user', JSON.stringify(user) , { maxAge: maxAge * 1000 , httpOnly: false });

            return response.ok({
                "jwt": token,
                "token_use_header" : "authorization: Bearer "+ token,
            })
            res.json('login successfully');
        });

    } catch (error) {
        return response.internalServerError(error);
    }

})


module.exports = router;