const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'chico',
        database: 'worksite'
    },
    console.log('Connected to the worksite database.')
);

module.exports = db;