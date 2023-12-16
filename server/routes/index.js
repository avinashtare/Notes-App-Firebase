const express = require("express")
const router = express.Router();
const user = require("./user")
const validate = require("./validate")
const notes = require("./notes");
const { authUser } = require("../middleware/auth");

// user 
router.use("/api/user", user);

// validate user 
router.use("/api/validate", validate);

// notes user --> before doning any actions on notes check user authorized or not User or not
router.use("/api/notes", authUser, notes);

module.exports = router;