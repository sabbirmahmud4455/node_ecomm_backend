require('dotenv').config();
const Response = require('../../utils/response');
const jwt = require('jsonwebtoken');
const userModule = require('../model/user/user')

module.exports = async function auth(req, res, next) {
    const response = new Response(res)

    const authHeader = req.headers['authorization'];
    const authCookie = req.cookies.jwt;

    if (authHeader == '' || authHeader == null && authCookie == '' || authCookie == null) return response.badRequest('Access Denied');

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

     jwt.verify(bearToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
        if (err) return response.badRequest('This route protected by authentication token not match');
        res.user = authData;
    })

    const auth_user = await userModule.find(res.user.user.id);
    if (auth_user.length > 0 && auth_user[0].is_active == 0) {
        res.cookie('jwt', "" , { maxAge: 1 , httpOnly: true });
        res.cookie('user', "" , { maxAge: 1 , httpOnly: true });
        response.badRequest('Auth user Inactive');
    }
    if (auth_user.length == 0  ) {
        res.cookie('jwt', "" , { maxAge: 1 , httpOnly: true });
        res.cookie('user', "" , { maxAge: 1 , httpOnly: true });
        response.badRequest('Auth user not found');
    } 

    next()
}