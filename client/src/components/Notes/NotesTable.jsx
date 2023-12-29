import React, { useContext, useEffect } from 'react'
import NotesCard from './NotesCard'
import NotesContext from "@/context/Notes/NotesContext"
import MessagesContext from "@/context/Message/MessageContext"
import AuthContext from '@/context/Auth/Auth/AuthContext'


function NotesTable(props) {
    // contax apis
    const NoteContext = useContext(NotesContext);
    const MessageContext = useContext(MessagesContext);
    const AuthContextAPI = useContext(AuthContext);
    const { showModal } = props;

    const loadData = async () => {
        if (AuthContextAPI.IsValid) {
            let isLoaded = await NoteContext.loadNotes();
            if (!isLoaded) {
                MessageContext.danger("Fetching Notes Error....");
            }
        }
    }
    // load notes 
    useEffect(() => {
        loadData()
    }, [AuthContextAPI.IsValid])

    // update notes <-------- add update heres
    const updateNote = async (...data) => {
        showModal(data)
    }

    // remove note 
    const removeNote = async (noteId) => {
        const isDeleted = await NoteContext.DeleteNote(noteId)
        if (isDeleted.deleted) {
            MessageContext.success("Note Deleted.")
        }
        else {
            MessageContext.danger("Falid To Delete Note.")
        }
    }

    // get notes from context
    const notesData = NoteContext.NotesData;
    return (
        <>
            <h1 className='text-center my-8 text-3xl font-bold text-white'>Your Notes</h1>
            <div className='flex justify-center'>
                <div className='flex flex-wrap justify-center'>
                    {notesData.length > 0 ? notesData.slice().reverse().map((data) => {
                        return <NotesCard key={data.noteId + Math.random()} data={data} actions={{ removeNote, updateNote }} />
                    }) : <p>Please add a note...</p>}
                </div>
            </div>
        </>
    )
}

export default NotesTable