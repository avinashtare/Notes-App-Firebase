import React, { useContext, useRef, useState } from 'react'
import NotesContext from "@/context/Notes/NotesContext"
import MessagesContext from "@/context/Message/MessageContext"

function NotesForm() {
    // contax apis
    const NoteContext = useContext(NotesContext);
    const MessageContext = useContext(MessagesContext);

    // input values 
    const [Note, setNote] = useState("")
    const [Desc, setDesc] = useState("")

    const handleAddNote = (e) => {
        e.preventDefault()
        const noteData = {
            title: Note,
            content: setDesc,
        }
        // add data 
        NoteContext.addNote(noteData);
        // clear inputs         
        setNote("")
        setDesc("")

        // show message 
        MessageContext.success("Message Added....")
    }

    return (
        <form className="max-w-sm mx-auto  bg-slate-800 p-6 mb-16 rounded-2xl border border-gray-700 border-w">
            <h2 className='my-5 text-3xl font-bold text-white'>Add a Note</h2>
            <div className="mb-5 ">
                <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
                <input type="text" id="note" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="anything"
                    value={Note}
                    onChange={(e) => setNote(e.target.value)} required />
            </div>
            <div className="mb-5">
                <label htmlFor="des" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <input type="text" id="des" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="i want more data"
                    value={Desc}
                    onChange={(e) => setDesc(e.target.value)} required />
            </div>

            <button type="submit" className="btn" onClick={handleAddNote}>Add</button>
        </form>
    )
}

export default NotesForm