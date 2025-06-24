const express = require("express");
const router = express.Router();
const { loginAdmin } = require("./login.controller");

router.post("/", loginAdmin);

module.exports = router;