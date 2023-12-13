import React from 'react'
import { Routes, Route } from "react-router-dom"

// pages 
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Blog from '@/pages/Blog'
import Signup from '@/pages/Signup'
import Login from '@/pages/Login'
import Logout from '@/pages/Logout'

function MainRouter() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/blog' element={<Blog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>

  )
}

export default MainRouter