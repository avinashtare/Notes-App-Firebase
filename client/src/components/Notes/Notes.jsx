import React from 'react'
import NotesForm from './NotesForm'
import NotesTable from './NotesTable'

function Notes() {
    return (
        <div className='px-5 pb-20 w-full'>
            <h1 className='text-center my-8 text-3xl font-bold text-white'>Fastes Notes App</h1>
            <NotesForm />
            <NotesTable />
        </div>
    )
}

export default Notes