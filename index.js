const express = require("express");
const cors = require("cors");

const aboutRoutes = require("./routes/about");
const solusiRoutes = require("./routes/solusi");
const newsletterRoutes = require("./routes/newsletter");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8800;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello From Backend");
});

app.use("/about", aboutRoutes);
app.use("/solusi", solusiRoutes);
app.use("/newsletter", newsletterRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Terjadi Kesalahan" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});