import React, { useContext } from 'react'
import NotesCard from './NotesCard'
import NotesContext from "@/context/Notes/NotesContext"
import MessagesContext from "@/context/Message/MessageContext"


function NotesTable() {
    // contax apis
    const NoteContext = useContext(NotesContext);
    const MessageContext = useContext(MessagesContext);


    const removeNote = (id) => {
        // console.log(id)
        NoteContext.DeleteNote(id)

        // show msg 
        MessageContext.danger("Message Deleted....")
    }
    const notesData = NoteContext.NotesData;

    return (
        <>
            <h1 className='text-center my-8 text-3xl font-bold text-white'>Your Notes</h1>
            <div className='flex justify-center'>
                <div className='flex flex-wrap justify-center'>
                    {notesData && notesData.slice().reverse().map((data) => {
                        return <NotesCard key={data.id} data={data} actions={{ removeNote }} />
                    })}
                </div>
            </div>
        </>
    )
}

export default NotesTable