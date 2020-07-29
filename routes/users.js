const express = require("express");
const userRegister = require("../controllers/users/registerController");
const userLogin = require("../controllers/users/loginController");
const userLogout = require("../controllers/users/logoutController");
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogout);

module.exports = router;
