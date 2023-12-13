import React, { useState } from 'react'

function NotesCard(props) {
    const { id, title, content, active, timestamp } = props.data;
    const { removeNote } = props.actions;
    const [Checked, setChecked] = useState(active);
    const chandleCheck = () => {
        Checked ? setChecked(false) : setChecked(true)
    }

    const handleDelete = ()=>{
        // send note id 
        removeNote(id)
    }

    return (
        <div className='m-2 w-72'>
            <div className="block max-w-sm p-6 px-5 border border-gray-200 rounded-xl shadow duration-500 hover:bg-gray-100  dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className={`mb-2 text-2xl decoration-red-700 font-bold tracking-tight text-gray-900 dark:text-white ${Checked && "line-through"} `}>
                    {title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {content}
                </p>

                <div className='mt-3'>
                    <span>{timestamp}</span>
                    <div className="actions  mt-5 flex items-center">
                        <button className="btn bg-red-600" onClick={handleDelete}>Delete</button>
                        <button className="btn bg-green-500">Update</button>
                        <div className="flex items-center">
                            <input type="checkbox" className="ml-2 w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none" checked={Checked && true} onChange={chandleCheck} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesCard