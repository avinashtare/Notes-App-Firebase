import { useState } from "react"
import NotesContext from "./NotesContext"
const ServerURL = import.meta.env.VITE_SERVER_URL;
import { getToken } from "@/utils/auth-session"

const LoadNotesRequest = async () => {
    const auth_token = getToken();
    const req = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": auth_token
        }
    }

    try {
        let response = await fetch(`${ServerURL}/` + "api/notes/get_all", req)
        response = await response.json()

        if (response.loaded) {
            return response
        }
        else {
            return { loaded: false }
        }

    } catch (error) {
        return { loaded: false }
    }
}

const AddNotesRequest = async ({ title, content }) => {
    const auth_token = getToken();
    const req = {
        body: JSON.stringify({ title: title, content: content }),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": auth_token
        }
    }

    try {
        let response = await fetch(`${ServerURL}/` + "api/notes/add", req)
        response = await response.json()

        if (response.added) {
            return response
        }
        else {
            return { added: false }
        }

    } catch (error) {
        return { added: false }
    }
}


const NotesProvider = (props) => {
    // all notes 
    const [NotesData, setNotesData] = useState([]);

    // add note 
    const addNote = async (note) => {
        let NotesAddData = await AddNotesRequest({ title: note.title, content: note.content })
        if (NotesAddData.added) {
            const noteData = {
                id: NotesAddData.data.noteId,
                title: NotesAddData.data.title,
                content: NotesAddData.data.content,
                timestamp: NotesAddData.data.timestamp,
                active: NotesAddData.data.active
            }

            setNotesData([...NotesData, noteData])

            return {added: true}
        }
        return {added: false}
    }


    const loadNotes = async () => {
        const StoredNotes = await LoadNotesRequest()
        if (StoredNotes.loaded) {
            setNotesData(StoredNotes.data);
            return true;
        }
        else {
            return false
        }
    }

    const DeleteNote = (noteId) => {
        setNotesData((preNotes) => preNotes.filter((note) => note.noteId != noteId));
    }

    return (
        <NotesContext.Provider value={{ loadNotes, NotesData, addNote, DeleteNote }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesProvider