const { GetAllNoteDB } = require("../../firebase/notes")

const getAllNotes = async (req, res) => {
    const userId = req.userId;
    const allNotes = await GetAllNoteDB({ userId })

    // Sort notes by timestamp
    const sortedNotes = allNotes.data.sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)));

    // send all notes
    res.send(sortedNotes)
}

module.exports = { getAllNotes }