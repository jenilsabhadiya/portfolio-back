const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const sentMail = async (to, subject, text) => {
  try {
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.log("asas", error);

    throw new Error("not wotking", error.message);
  }
};

const sendMailResend = async (to, subject, text) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  resend.emails.send({
    from: "onboarding@resend.dev",
    // to: "sabhadiyajenil61@gmail.com",
    // subject: "Hello World",
    // html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    to,
    subject,
    text,
  });
};

module.exports = { sentMail, sendMailResend };
