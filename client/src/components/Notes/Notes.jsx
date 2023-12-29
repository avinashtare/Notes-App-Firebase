import React, { useState } from 'react'
import NotesForm from './NotesForm'
import NotesTable from './NotesTable'
import UpdateNoteModal from './UpdateNoteModal'

function Notes() {
    const [showModalState, setshowModalState] = useState({ show: false, data: null});

    const showModal = (data) => {
        setshowModalState({ show: true, data: data[0] });
    }

    return (
        <div className='px-5 pb-20 w-full'>
            <UpdateNoteModal modalActions={{ showModalState, setshowModalState }} />
            <h1 className='text-center my-8 text-3xl font-bold text-white'>Fastes Notes App</h1>
            <NotesForm FormAction="insert" />
            <NotesTable showModal={showModal} />
        </div>
    )
}

export default Notes