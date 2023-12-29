import React, { useContext, useEffect, useRef, useState } from 'react'
import NotesContext from "@/context/Notes/NotesContext"
import MessagesContext from "@/context/Message/MessageContext"
import AuthContext from '@/context/Auth/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'


function NotesForm(props) {
    // contax apis
    const NoteContext = useContext(NotesContext);
    const MessageContext = useContext(MessagesContext);
    const AuthContextAPI = useContext(AuthContext);
    const navigate = useNavigate();
    const { FormAction, UpdateData,CloseUpdateModal } = props;

   // input values 
   const [Note, setNote] = useState("");
   const [Desc, setDesc] = useState("");

//    update title 
    useEffect(() => {
      try {
        if(UpdateData.title){
            setNote(UpdateData.title)
            setDesc(UpdateData.content)
        }
      } catch (error) {}
    
    }, [UpdateData])
    
 

    const validateInput = () => {
        // validation 
        if (Note.length == 0 || Note.length > 30) {
            MessageContext.danger("Title Length Must Be 1-30")
            return false;
        }
        if (Desc.length < 4 || Note.length > 250) {
            MessageContext.danger("Description Length Must Be 5-250 ")
            return false;
        }
        return true;
    }
    const handleAddNote = async (e) => {
        // if user not login and click on add note then redirect user on login page 
        if (!AuthContextAPI.IsValid) {
            navigate("/login")
            return
        }

        // validate user 
        if (!validateInput()) return 0;

        const noteData = {
            title: Note,
            content: Desc,
        }

        // add data 
        let isAdded = await NoteContext.addNote(noteData);
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
    }

    const handleUpdateNote = async (e) => {
        // validate user 
        if (!validateInput()) return 0;

        const noteData = {
            noteId: UpdateData.noteId,
            title: Note,
            content: Desc,
            active: UpdateData.active
        }

        // UpdateNote
        let updateNote = await NoteContext.UpdateNote(noteData);
        if (updateNote.updated) {

            // close modal if data updated 
            CloseUpdateModal();
            // show message 
            MessageContext.success("Note Updated....")
        }
        else {
            // show message 
            MessageContext.danger("Falid To Update Note....")
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        if (FormAction == "insert") {
            handleAddNote(e);
        }
        else if (FormAction == "update") {
            handleUpdateNote(e);
        }
    }

    return (
        <form className={`max-w-sm mx-auto bg-slate-800 p-6 mb-16 rounded-2xl border border-gray-700 border-w ${FormAction == "update" ? "bg-[#0000007c] border-0 w-[650px]" : null}`}>
            <h2 className='my-5 text-3xl font-bold text-white'>{FormAction == "update" ? "Update Note" : "Add a Note"}</h2>
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

            <button type="submit" className="btn" onClick={handleSubmitForm}>{FormAction == "update" ? "Update" : "Add"}</button>
        </form>
    )
}

export default NotesForm