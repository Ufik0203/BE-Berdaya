const express = require("express");
const router = express.Router();
const { poolPromise } = require("../config/db");

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise; 
        const result = await pool.request().query(
            `SELECT 
                about.id AS about_id, 
                about.judul AS about_judul, 
                about.description AS about_description, 
                about.image_url AS about_image_url, 
                about.image_diagram, 
                card_about.judul_card AS card_about_judul, 
                card_about.image_url_card AS card_about_image_url 
            FROM about 
            JOIN card_about ON about.id = card_about.about_id`
        );
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error("Error query:", err.message);
        res.status(500).json({ error: "Gagal get data" });
    }
});

module.exports = router;