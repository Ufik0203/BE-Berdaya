require('dotenv').config();
var fs = require('fs');
var mysql = require('mysql');

const serverCa = [fs.readFileSync(process.env.SSL, "utf8")];

var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true,
        ca: serverCa,
    }
});

conn.connect(function(err) {
    if (err) {
        console.error("Koneksi ke database gagal: ", err.message);
        return;
    }
    console.log("Terhubung ke database dengan koneksi aman.");
});