const { validationResult } = require("express-validator");
const { DeleteNoteDB } = require("../../firebase/notes");

const DeleteNote = async (req, res) => {
    const { noteId } = req.body;
    const userId = req.userId;

    const errors = validationResult(req);

    // error response 
    let invalidNote = {
        message: "note id not valid...",
        status: 200,
        errors: errors.array()
    }

    // invalid note id send response 
    if (!errors.isEmpty()) {
        return res.json(invalidNote);
    }

    const isDeleted = await DeleteNoteDB({ noteId })

    if (isDeleted) {
        // deleted success response 
        let deletedNoteRes = {
            message: "Note Deleted Successfully...",
            status: 200,
            deleted: true
        }
        return res.send(deletedNoteRes)
    }
    else{
          // deleted success response 
          let FaliedNoteRes = {
            message: "Note Deleted Falied...",
            status: 200,
            deleted: false
        }
        return res.send(FaliedNoteRes)
    }

}

module.exports = { DeleteNote }