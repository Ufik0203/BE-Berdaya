// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// router.get("/", (req, res) => {
//   const sql =
//     "SELECT about.id AS about_id, about.judul AS about_judul, about.description AS about_description, about.image_url AS about_image_url, about.image_diagram, card_about.judul_card AS card_about_judul, card_about.image_url_card AS card_about_image_url FROM about JOIN card_about ON about.id = card_about.about_id";
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// module.exports = router;