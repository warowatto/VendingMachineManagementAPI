const mysql = require('promise-mysql');

module.exports = mysql.createPool({
    host: 'localhost',
    user: 'root',
    // password: 'root',
    database: 'management'
});