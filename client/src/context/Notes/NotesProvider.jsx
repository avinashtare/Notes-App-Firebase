import { useState } from "react"
import NotesContext from "./NotesContext"

const NotesProvider = (props) => {
    let notesData = [
        {
            id: 1,
            title: "Meeting Agenda",
            content: "Discuss project updates and timelines.",
            timestamp: "2023-12-12T09:00:00",
            active: true
        },
        {
            id: 2,
            title: "Grocery List",
            content: "Milk, eggs, bread, fruits.",
            timestamp: "2023-12-12T12:30:00",
            active: false
        },
        {
            id: 3,
            title: "Book Recommendations",
            content: "Check out 'The Silent Patient' and 'Educated'.",
            timestamp: "2023-12-13T18:00:00",
            active: true
        },
        {
            id: 4,
            title: "Fitness Goals",
            content: "30 minutes of cardio and 20 minutes of strength training.",
            timestamp: "2023-12-14T07:00:00",
            active: false
        }
    ]

    const [NotesData, setNotesData] = useState(notesData);

    const addNote = (note) => {
        const noteData = {
            id: Math.random(),
            title: note.title,
            content: note.desc,
            timestamp: String(new Date()),
            active: true
        }

        setNotesData([...NotesData, noteData])
    }

    const DeleteNote = (id) => {
        setNotesData((preNotes) => preNotes.filter((note) => note.id !== id));
    }

    return (
        <NotesContext.Provider value={{ NotesData, addNote, DeleteNote }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesProvider