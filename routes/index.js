const express = require("express");
const router = express.Router();
const { verifyEmailID } = require("../controllers/users/registerController");

router.get("/verify", verifyEmailID);

module.exports = router;
