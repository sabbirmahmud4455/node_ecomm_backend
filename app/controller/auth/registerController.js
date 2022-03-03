const express = require('express');
require('dotenv').config();
const router = express.Router();
const { validateRequest } = require('../../validation/auth/registerValidator');
const Response = require('../../../utils/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerModule = require('../../model/auth/register');


router.post('/', async (req, res) => {
    const response = new Response(res)
  
    try {
      const {data, error} = validateRequest (req);

      if(error) return response.badRequest(error);

      const {name, email, phone, password} = data;
  
      const passwordHash = bcrypt.hashSync(password, 10);
  
      const register = await registerModule.register(name, email, phone, passwordHash);

      const user = {
            id: register.insertId,
            name: name,
            email: email,
        }

        const maxAge = 60 * 60 * 24 ;

        jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: `${maxAge}s`}, (err, token) => {

            if (err) return res.json(err);

            res.cookie('jwt', "Bearer "+ token , { maxAge: maxAge * 1000 , httpOnly: true });
            res.cookie('user', JSON.stringify(user) , { maxAge: maxAge * 1000 , httpOnly: false });

            return response.content({
                "jwt": token,
                "token_use_header" : "authorization: Bearer "+ token,
            })
        });
      
    } catch (error) {
      const message = error.message ? error.message : 'Server error';
      response.internalServerError({ message });
    }
  
})

module.exports = router;