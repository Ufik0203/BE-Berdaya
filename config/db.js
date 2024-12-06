require("dotenv").config();
const sql = require("mssql");

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

let poolPromise;

async function connectToDatabase() {
    try {
        const pool = await new sql.ConnectionPool(dbConfig).connect();
        console.log("Terhubung ke SQL Server");
        poolPromise = pool; 
    } catch (err) {
        console.error("Koneksi ke database gagal:", err.message);
        process.exit(1);
    }
}

connectToDatabase();

module.exports = {
    sql,
    poolPromise,
};