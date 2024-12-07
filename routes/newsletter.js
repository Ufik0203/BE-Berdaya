// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// router.post("/", (req, res) => {
//     const { email } = req.body;

//     const sql = "INSERT INTO subscribers_email (email) VALUES (?)";
//     db.query(sql, [email], (err, data) => {
//         if (err) {
//             console.error("Error saving email to database:", err);
//             return res.status(500).json({ message: "Gagal menyimpan email ke database" });
//         }

//         const mailOptions = {
//             from: {
//                 name: "Berdaya",
//                 address: process.env.EMAIL_USER,
//             },
//             to: email,
//             subject: "Terima kasih telah mengikuti Berdaya",
//             html: `<p>Terima kasih telah mengikuti Berdaya. Kami akan memberikan update perkembangan Berdaya secara berkala.</p>`,
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error("Error sending email:", error);
//                 return res.status(500).json({ message: "Gagal mengirim email" });
//             }
//             // console.log("Email sent:", info.response);
//             return res.status(200).json({ message: "Success" });
//         });
//     });
// });

// module.exports = router;