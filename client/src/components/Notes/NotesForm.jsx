import React, { useContext, useRef, useState } from 'react'
import NotesContext from "@/context/Notes/NotesContext"
import MessagesContext from "@/context/Message/MessageContext"
import AuthContext from '@/context/Auth/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'


function NotesForm() {
    // contax apis
    const NoteContext = useContext(NotesContext);
    const MessageContext = useContext(MessagesContext);
    const AuthContextAPI = useContext(AuthContext);
    const navigate = useNavigate()


    // input values 
    const [Note, setNote] = useState("")
    const [Desc, setDesc] = useState("")

    const handleAddNote = async (e) => {
        e.preventDefault()
        if (!AuthContextAPI.IsValid) {
            navigate("/login")
            return
        }
        if (Note.length == 0 || Note.length > 30) {
            MessageContext.danger("Title Length Must Be 1-30")
            return
        }
        if (Desc.length < 4 || Note.length > 250) {
            MessageContext.danger("Description Length Must Be 5-250 ")
            return
        }

        const noteData = {
            title: Note,
            content: Desc,
        }

        // add data 
        let isAdded = await NoteContext.addNote(noteData);
        console.log(isAdded)
        if (isAdded.added) {
            // clear inputs         
            setNote("")
            setDesc("")

            // show message 
            MessageContext.success("Note Added....")
        }
        else {
            // show message 
            MessageContext.danger("Falid To add note....")
        }
        console.log(NoteContext.NotesData)

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