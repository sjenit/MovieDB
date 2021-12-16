'use strict';
let _connection = null;

const getConnection = () => {
    if (!_connection) {
        _connection = require('knex')({
            client: 'pg',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                port: process.env.DB_PORT,
                ssl: { rejectUnauthorized: false },
            },
            pool: {
                min: 1,
                max: 1
            }
        });
    }
    return _connection;
}

module.exports = {
    getConnection
}