const home = async (req, res) => {
  return res.render("index", { title: "Express" });
};
module.exports = home;
