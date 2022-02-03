require('dotenv').config();
const Response = require('../../utils/response');
const jwt = require('jsonwebtoken');


module.exports = function auth(req, res, next) {

    const response = new Response(res)

    const authHeader = req.headers['authorization'];
    const authCookie = req.cookies.jwt;

    if (authHeader == null && authCookie == null) return response.badRequest('Access Denied');

    let jwToken = null

    if (authCookie && authHeader == null) {
        jwToken = authCookie
    } else if (authHeader && authCookie == null) {
        jwToken = authHeader
    } else if(authHeader && authCookie &&  authHeader == authCookie) {
        jwToken = authHeader
    }

    const bear = jwToken.split(' ');
    const bearToken = bear[1];

    req.token = bearToken

    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
        if (err) return response.badRequest('This route protected by authentication token not match');

        res.user = authData;
        res.header(
            'authenticationToken', "Bearer "+ req.headers['authorization']
        )
        next()
    })
}