const mysql2 = require("mysql2");
const fs = require("fs"); 
require("dotenv").config();

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: {
        ca: fs.readFileSync(process.env.SSL)
    }
});

module.exports = db;