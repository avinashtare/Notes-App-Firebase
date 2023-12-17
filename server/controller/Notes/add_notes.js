const { validationResult } = require("express-validator");
const { AddNoteDB } = require("../../firebase/notes");
const {  getCurrentDateTime } = require("../../utils/time");

const addNote = async (req, res) => {
    // check validation erro and handle 
    const errors = validationResult(req);

    // error response 
    let invalidNote = {
        message: "Invalid Notes Data",
        status: 200,
        errors: errors.array()
    }

    // invalid note send response 
    if (!errors.isEmpty()) {
        return res.json(invalidNote);
    }

    const currentTime = getCurrentDateTime()
    const noteData = { userId: req.userId, title: req.body.title, content: req.body.content, active: false, timestamp: currentTime }

    const NoteDBRes = await AddNoteDB(noteData)


    if (NoteDBRes.data) {
        const AddedSuccessfullyRes = {
            message: "Notes Added Successfully....",
            added: true,
            status: 200,
            data: NoteDBRes.data
        }

        return res.send(AddedSuccessfullyRes);
    }

    return res.json({ message: "Server Error", status: 500 })
};

module.exports = addNote;