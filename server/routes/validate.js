const express = require("express");
const { authUser } = require("../middleware/auth");
const router = express.Router()

// validate user
router.post("/user", authUser);

module.exports = router;