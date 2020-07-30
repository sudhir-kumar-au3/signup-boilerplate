const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
module.exports = smtpTransport;
