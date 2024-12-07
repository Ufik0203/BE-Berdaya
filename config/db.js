require("dotenv").config();
const mysql2 = require("mysql2");
var fs = require("fs");

const serverCa = [fs.readFileSync(process.env.SSL, "utf8")];

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true,
        ca: serverCa
    }
});

db.connect((err) => {
    if (err) {
        console.error("Koneksi ke database gagal:", err.message);
    } else {
        console.log("Terhubung ke database dengan koneksi aman.");
    }
});

module.exports = db;