const express = require("express");
const cors = require("cors");
require("dotenv").config();

// const aboutRoutes = require("./routes/about");
// const solusiRoutes = require("./routes/solusi");
const newsletterRoutes = require("./routes/newsletter");

const app = express();
const port = process.env.PORT;  

app.use(cors()); 
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello From Backend");
});

app.get("/solusi", (req, res) => {
  const sql = "SELECT * FROM berdaya.solusi";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// app.use("/about", aboutRoutes);
// app.use("/solusi", solusiRoutes);
app.use("/newsletter", newsletterRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});