const express = require("express");
const router = express.Router();

const {registerUser , Login} = require("../controller/userController");

router.post("/register", registerUser);
router.post("/login", Login);


module.exports = router;