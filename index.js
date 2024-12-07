require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8800;

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

app.get("/solusi", (req, res) => {
  const sql = "SELECT * FROM solusi";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
