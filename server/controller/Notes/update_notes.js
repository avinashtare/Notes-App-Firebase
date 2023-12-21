const { validationResult } = require("express-validator");
const { UpdateNoteDB } = require("../../firebase/notes");

const updateNote = async (req, res) => {
    try {

        // check validation erro and handle 
        const errors = validationResult(req);
        const userId = req.userId;
        const { noteId, title, content, active } = req.body;

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

        const updateNoteData = { userId, noteId, title, content, active }

        // update notes in db 
        const UpdateNoteDBResponse = await UpdateNoteDB(updateNoteData);

        if (UpdateNoteDBResponse) {
            // updated success response 
            let updatedNoteRes = {
                message: "Note updated Successfully...",
                status: 200,
                updated: true
            }
            return res.send(updatedNoteRes)
        }
        else{
              // updated success response 
              let FaliedNoteRes = {
                message: "Note updated Falied...",
                status: 200,
                updated: false
            }
            return res.send(FaliedNoteRes)
        }

    } catch (error) {
        return res.json({ message: "Server Error", status: 500 })
    }
};

module.exports = updateNote;