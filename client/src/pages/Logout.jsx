import React, { useContext, useEffect, useState } from 'react'
import LogoutContext from '../context/Auth/Logout/LogoutContext'
import AuthContext from '@/context/Auth/Auth/AuthContext'
import { useNavigate } from "react-router-dom";
import MessagesContext from "@/context/Message/MessageContext"


function Logout() {
    const LogoutContextAPI = useContext(LogoutContext)
    const AuthContextAPI = useContext(AuthContext);
    const MessageContext = useContext(MessagesContext);
    const naviage = useNavigate()

    useEffect(() => {
        if (AuthContextAPI.IsValid) {
            LogoutContextAPI.LogoutUser()
            AuthContextAPI.CheckValidUser()
            naviage("/login")
        }
    }, [])

    return (
        <div className="container m-auto">
            <h1 className='text-center my-48 text-3xl font-bold text-white'>Logout</h1>
        </div>
    )
}

export default Logout