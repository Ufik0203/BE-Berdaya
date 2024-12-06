const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM solusi");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error query:", err.message);

    res.status(500).json({ error: `Terjadi kesalahan: ${err.message}` });
  }
});

module.exports = router;
