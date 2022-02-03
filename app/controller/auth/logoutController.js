require('dotenv').config();
const express = require('express');
const router = express.Router();
// const Response = require('../../../utils/response');


router.post('/', (req, res) => {
    res.cookie('jwt', "Bearer" , { maxAge: 1 , httpOnly: true }).send('logout successfully');
    res.header(
        'authenticationToken', ""
    )
})

module.exports = router



