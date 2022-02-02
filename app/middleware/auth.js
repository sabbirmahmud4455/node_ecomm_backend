require('dotenv').config();
const Response = require('../../utils/response');
const jwt = require('jsonwebtoken');


module.exports = function auth(req, res, next) {

    const response = new Response(res)

    const authHeader = req.headers['authorization'];

    // return res.json(authHeader);
  
    if (authHeader == null) return response.badRequest('Access Denied');

    const bear = authHeader.split(' ');
    const bearToken = bear[1];

    req.token = bearToken

    jwt.verify(req.token, 'asddsfasdff', (err, authData) => {
        if (err) return response.badRequest('This route protected by authentication token not match');
        // res.json(authData.user)

        res.user = 'asdf';


        res.header(
            'authenticationToken', "Bearer "+ req.headers['authorization']
        )
        next()
    })

}