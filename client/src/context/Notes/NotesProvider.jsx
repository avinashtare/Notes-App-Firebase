import { useDeferredValue, useState } from "react"
import NotesContext from "./NotesContext"
const ServerURL = import.meta.env.VITE_SERVER_URL;
import { getToken } from "@/utils/auth-session"

const LoadNotesRequest = async () => {
    const auth_token = await getToken();
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
    const auth_token = await getToken();
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

const UpdateNotesRequest = async ({ noteId, title, content, active }) => {
    const auth_token = await getToken();
    const req = {
        body: JSON.stringify({ noteId, title, content,active }),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": auth_token
        }
    }

    try {
        let response = await fetch(`${ServerURL}/` + "api/notes/update", req)
        response = await response.json()

        if (response.updated) {
            return { updated: true }
        }
        else {
            return { updated: false }
        }

    } catch (error) {
        return { updated: false }
    }
}

const DeleteNotesRequest = async ({ noteId }) => {
    const auth_token = await getToken();
    const req = {
        body: JSON.stringify({ noteId: noteId }),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": auth_token
        }
    }

    try {
        let response = await fetch(`${ServerURL}/` + "api/notes/delete", req)
        response = await response.json()

        if (response.deleted) {
            return response
        }
        else {
            return { deleted: false }
        }

    } catch (error) {
        return { deleted: false }
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

            return { added: true }
        }
        return { added: false }
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
    
    const UpdateNote = async (noteData)=>{
        // UpdateNotesRequest
        const UpdateDataServer = await UpdateNotesRequest(noteData);
        // if note updated load new data 
        if(UpdateDataServer.updated) loadNotes();
        return UpdateDataServer;
    }

    const DeleteNote = async (noteId) => {
        let isDeleted = await DeleteNotesRequest({ noteId })
        if (isDeleted.deleted) {
            setNotesData((preNotes) => preNotes.filter((note) => note.noteId != noteId));
            return { deleted: true }
        }
        else {
            return { deleted: false }
        }
    }

    return (
        <NotesContext.Provider value={{ loadNotes, NotesData, addNote, DeleteNote,UpdateNote }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesProvider