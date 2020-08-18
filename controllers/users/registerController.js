const { Users } = require("../../db/config");
const crypto = require("crypto");
const smtpTransport = require("../../utils/nodemailer");

let randomCode, mailOptions, host, link;

const userRegister = async (req, res) => {
  const { email, mobile } = req.body;
  try {
    const userData = await Users.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });
    if (!userData) {
      randomCode = crypto.randomBytes(20).toString("hex");
      host = req.get("host");
      link = `http://${req.get("host")}/verify?id=${randomCode}&user=${email}`;
      mailOptions = {
        to: email,
        subject: "Please confirm your Email account",
        html: `Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`,
      };
      // const verification = await smtpTransport.sendMail(mailOptions);
      // if (verification) {
      const newUser = await Users.create(req.body);
      return res.status(201).json({
        success: true,
        message: `${newUser.name} registered successfully!`,
        info: "Please check your email for verification code",
      });
      // } else {
      //   return res
      //     .status(500)
      //     .json({ success: false, error: "Something went wrong!" });
      // }
    } else {
      return res.status(409).json({
        success: false,
        error: "You're already onboard, try login using your credentials",
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

const verifyEmailID = async (req, res) => {
  console.log(req.protocol + ":/" + req.get("host"));
  if (req.protocol + "://" + req.get("host") === "http://" + host) {
    if (req.query.id === randomCode) {
      const filter = { email: req.query.user };
      const update = { verifiedEmail: true };
      const verified = await Users.findOneAndUpdate(filter, update);
      if (verified) {
        return res.status(200).json({
          success: true,
          message: `Your email-Id is been Successfully verified`,
        });
      } else {
        return res
          .status(500)
          .json({ success: false, error: "Email verification failed!" });
      }
    } else {
      return res.status(400).json({ success: false, message: "Bad request" });
    }
  } else {
    return res.status(500).end("Request is from unknown source");
  }
};

module.exports = {
  verifyEmailID,
  userRegister,
};
