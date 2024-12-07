const mysql2 = require("mysql2");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: {
    ca: fs.readFileSync(process.env.SSL), 
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello From Backend Berdaya, we are ready!");
});

app.get("/about", (req, res) => {
  const sql = "SELECT * FROM about";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to Azure MySQL:", err.message);
//     throw err;
//   }
//   console.log("Connected to Azure MySQL!");

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to Azure MySQL:", err.message);
      process.exit(1); 
    }
    console.log("Connected to Azure MySQL!");
  });

  db.query("SELECT * FROM about", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
    } else {
      console.log("Query results:", results);
    }
    db.end();
  });
// });

app.listen(process.env.DB_PORT, () => {
  console.log(`Server is running on port ${process.env.DB_PORT}`);
})