const express = require("express");
const home = require("../controllers/home/home");
const router = express.Router();
const authorization = require("../middleware/auth");
router.get("/home", authorization, home);

module.exports = router;
