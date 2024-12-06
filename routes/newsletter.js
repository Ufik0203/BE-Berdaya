const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../config/db");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

router.post("/", async (req, res) => {
    const { email } = req.body;

    try {
        const pool = await poolPromise;

        await pool.request()
            .input('email', sql.VarChar, email)
            .query("INSERT INTO subscribers_email (email) VALUES (@email)");

        const mailOptions = {
            from: {
                name: "Berdaya",
                address: process.env.EMAIL_USER,
            },
            to: email,
            subject: "Terima kasih telah mengikuti Berdaya",
            html: `<p>Terima kasih telah mengikuti Berdaya. Kami akan memberikan update perkembangan Berdaya secara berkala.</p>`,
        };

        const sendMailAsync = async () => {
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(info);
                });
            });
        };

        await sendMailAsync();

        return res.status(200).json({ message: "Email berhasil disimpan dan dikirim" });

    } catch (err) {
        console.error("Error processing request:", err);
        return res.status(500).json({ message: "Gagal memproses permintaan" });
    }
});

module.exports = router;
