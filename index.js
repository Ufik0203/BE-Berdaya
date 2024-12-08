require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

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
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const newsLetterLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Anda sudah melakukan request sebanyak 5 kali dalam waktu 15 menit, mohon tunggu sejenak untuk melakukan request lagi",
});

app.post("/newsletter", newsLetterLimit, (req, res) => {
  const { email } = req.body;

  const checkEmail = "SELECT * FROM subscribers_email WHERE email = ?";
  db.query(checkEmail, [email], (err, data) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ message: "Gagal memeriksa email yang terdaftar" });
    }

    if (data.length > 0) {
      return res.status(400).json({
        message: "Terimas kasih, Email andah sudah terdaftar sebelumnya",
      });
    }

    const insertEmail = "INSERT INTO subscribers_email (email) VALUES (?)";
    db.query(insertEmail, [email], (err) => {
      if (err) {
        console.error("Error saving email to database:", err);
        return res.status(500).json({ message: "Gagal menyimpan email ke database" });
      }

      const mailOptions = {
        from: {
          name: "Berdaya",
          address: process.env.EMAIL_USER,
        },
        to: email,
        subject: "Terima kasih telah mengikuti Berdaya",
        html: `<p>Terima kasih telah mengikuti Berdaya. Kami akan memberikan update perkembangan Berdaya secara berkala.</p>`,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error("Error sending email:", err);
          return res.status(500).json({ message: "Gagal mengirim email" });
        }
        return res.status(200).json({ message: "Success" });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
