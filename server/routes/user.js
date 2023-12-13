const express = require("express")
const router = express.Router()
const createUser = require("../controller/auth/users/register");
const loginUser = require("../controller/auth/users/login");
const { validateNewUser, validateLoginUser } = require("../controller/auth/validate_credentials/user");

// register user 
router.post("/register", validateNewUser, createUser);

// login user 
router.post("/login", validateLoginUser, loginUser);

module.exports = router;
