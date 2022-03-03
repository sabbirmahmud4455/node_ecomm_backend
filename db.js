const mysql = require('mysql');
const Bluebird = require('bluebird');
require('dotenv').config();

const config = 
    {
        "host": process.env.db_host ? process.env.db_host : '',
        "port": process.env.db_port ? process.env.db_port : '',
        "user": process.env.db_user_name ? process.env.db_user_name : '',
        "password": process.env.db_password ? process.env.db_password : '',
        "database": process.env.db_name ? process.env.db_name : ''
    }

const connection =  mysql.createConnection(config);
connection.query = Bluebird.promisify(connection.query);

module.exports = connection;