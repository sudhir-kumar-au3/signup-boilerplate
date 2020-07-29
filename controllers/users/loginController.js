const { Users } = require("../../db/config");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");
const userLogin = async (req, res) => {
  const { email, password, mobile } = req.body;
  try {
    const result = await Users.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        const { email, mobile } = result;
        await generateToken(res, email, mobile);
      } else {
        return res
          .status(401)
          .json({ success: false, error: "Incorrect Password!" });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, error: "User not registered!" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = userLogin;
