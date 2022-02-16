const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'worksite'
    },
    console.log('Connected to the worksite database.')
);

module.exports = connection;