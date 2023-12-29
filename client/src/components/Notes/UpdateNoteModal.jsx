import React, { useEffect } from 'react'
import NotesForm from './NotesForm'

function UpdateNoteModal(props) {
    const { showModalState, setshowModalState } = props.modalActions;

    const closeModal = ()=>{
        setshowModalState({show: false,data: null}) 
    }

    return (
        <div className={`w-screen h-screen bg-[#272727d1] fixed overflow-hidden top-0 left-0 flex items-center ${showModalState.show ? {} : "hidden"}`}>
            <div className="remove bg-neutral-200 text-slate-600 w-6 h-6 p-4 text-2xl rounded-full cursor-pointer absolute top-2 right-8 flex items-center justify-center hover:bg-neutral-300" onClick={closeModal}>
                <span>X</span>
            </div>
            <NotesForm FormAction="update" UpdateData={showModalState.data} CloseUpdateModal={closeModal}/>
        </div>
    )
}

export default UpdateNoteModal