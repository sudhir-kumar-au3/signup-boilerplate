const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const authorization = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json("You need to Login");
    }
    const decrypt = await jwt.verify(token, process.env.SECRET);
    req.user = {
      email: decrypt.email,
      mobile: decrypt.mobile,
    };
    next();
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = authorization;
