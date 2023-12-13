import React from 'react'
import MainRouter from "@/routers/MainRouter"
// import { FireBaseApp } from "@/firebase/config"
// components
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import MessageModal from '@/components/MessageModal'

function Home() {

  return (
    <div className='bg-slate-800 text-white w-full h-full overflow-x-hidden'>
      {/* nav */}
      <Nav />
      {/* routs  */}
      <MainRouter />
      {/* message modal  */}
      <MessageModal />
      {/* fotter */}
      <Footer />
    </div>
  )
}

export default Home