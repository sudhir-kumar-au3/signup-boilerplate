const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateToken = (res, email, mobile) => {
  const expiration = process.env.DB_ENV === "testing" ? 100 : 604800000;
  const token = jwt.sign({ email, mobile }, process.env.SECRET, {
    expiresIn: process.env.DB_ENV === "testing" ? "1d" : "7d",
  });
  return res
    .cookie("token", token, {
      expires: new Date(Date.now() + expiration),
      secure: false, // set to true if your using https
      httpOnly: true,
      path: "/",
    })
    .status(200)
    .json({ success: true, email, message: "Login Success!" });
};
module.exports = generateToken;
