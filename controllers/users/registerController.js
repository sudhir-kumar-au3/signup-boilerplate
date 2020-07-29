const { Users } = require("../../db/config");
const userRegister = async (req, res) => {
  const { email, mobile } = req.body;
  try {
    const userData = await Users.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });
    if (!userData) {
      const newUser = await Users.create(req.body);
      return res.status(201).json({
        success: true,
        message: newUser.name + " registered successfully!",
      });
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
module.exports = userRegister;
