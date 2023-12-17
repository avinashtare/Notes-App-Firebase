const express = require("express");
const router = express.Router();
const addNote = require("../controller/Notes/add_notes");
const { validate_add_note, validate_delete_note } = require("../controller/Notes/validate_notes");
const { getAllNotes } = require("../controller/Notes/get_all");
const { DeleteNote } = require("../controller/Notes/delete_notes");

// Add note to db 
router.post("/add", validate_add_note, addNote);

// Add note to db 
router.post("/get_all", getAllNotes);

// Add note to db 
router.post("/delete", validate_delete_note, DeleteNote);

module.exports = router;