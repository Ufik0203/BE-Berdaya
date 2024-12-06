require("dotenv").config();
const sql = require("mssql");

// Konfigurasi koneksi
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, 
        trustServerCertificate: true,
    },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => {
        console.log("Terhubung ke SQL Server");
        return pool;
    })
    .catch((err) => {
        console.error("Koneksi ke database gagal:", err.message);
    });

module.exports = {
    sql,
    poolPromise,
};