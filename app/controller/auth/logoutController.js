require('dotenv').config();
const express = require('express');
const router = express.Router();
// const Response = require('../../../utils/response');


router.post('/', (req, res) => {
    res.cookie('jwt', "" , { maxAge: 1 , httpOnly: true });
    res.cookie('user', "" , { maxAge: 1 , httpOnly: true }).send('logout successfully');
})

module.exports = router



