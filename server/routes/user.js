const express = require("express")
const router = express.Router()
const createUser = require("../controller/users/register");
const { validateNewUser, validateLoginUser } = require("../controller/validate/user");
const loginUser = require("../controller/users/login");

// register user 
router.post("/register", validateNewUser, createUser);

// login user 
router.post("/login", validateLoginUser, loginUser);

module.exports = router;