const express = require("express");
const router = express.Router();
const authorization = require("../middleware/auth");
/* GET home page. */
router.get("/home", authorization, function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
