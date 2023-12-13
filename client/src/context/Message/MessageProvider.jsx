import React from 'react'
import MessageContext from "./MessageContext";
import { toast } from 'react-toastify';


const MessageProvider = (props) => {
    const success = (msg) => {
        toast.success(msg, {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const danger = (msg) => {
        toast.error(msg, {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const showMsg = (msg) => {
        toast(msg, {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <MessageContext.Provider value={{ showMsg, success, danger }}>
            {props.children}
        </MessageContext.Provider>
    )
}

export default MessageProvider