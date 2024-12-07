import React from 'react'
import { Sidebar } from './Sidebar'
import logo from "../assets/images/logo.jpg";
const FeedLeftContent = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:static bg-white flex flex-col items-start justify-start  px-0 lg:px-1 pt-2 z-10 lg:w-3/12 lg:min-h-screen ">
    <img src={logo} className="w-10 max-w-10 hidden lg:block" />
    <Sidebar />
  </div>
  )
}

export default FeedLeftContent