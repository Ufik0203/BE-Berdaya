const express = require("express");
const cors = require("cors");
const db = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.DB_PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello dari Backend");
})

// app.get("/about", (req, res) => {
//   const sql = "SELECT * FROM berdaya.about";
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   })
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})