const userLogout = async (req, res) => {
  await res.clearCookie("token");
  return res.status(300).redirect("/");
};
module.exports = userLogout;
