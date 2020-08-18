const express = require("express");
const { home1, home2 } = require("../controllers/home/home");
const router = express.Router();
const authorization = require("../middleware/auth");
router.get("/home1", authorization, home1);
router.get("/home2", authorization, home2);
module.exports = router;
