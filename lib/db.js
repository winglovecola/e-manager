const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'abc01208Four@',
        database: 'emanager_db'
    }
);

module.exports = db;
