const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'process.env.MYSQL_PASSWORD',
    port: 3306,
    database: 'slack'
})

db.connect();

module.exports = db;