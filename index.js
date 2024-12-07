require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const nodemailer = require("nodemailer");

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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/newsletter", (req, res) => {
    const { email } = req.body;

    const sql = "INSERT INTO subscribers_email (email) VALUES (?)";
    db.query(sql, [email], (err, data) => {
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

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Gagal mengirim email" });
            }
            // console.log("Email sent:", info.response);
            return res.status(200).json({ message: "Success" });
        });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
