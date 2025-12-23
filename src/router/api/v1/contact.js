const express = require("express");
const router = express.Router();
const { sentMail } = require("../../../utlis/nodemailer");

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  try {
    const text = `From: ${name} <${email}>\n\n${message}`;

    // Send email
    await sentMail(process.env.NODEMAILER_USER, subject, text);

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

module.exports = router;
