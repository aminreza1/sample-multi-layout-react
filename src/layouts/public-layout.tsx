import React from 'react'
import { Link } from 'react-router-dom'

const PublicLayout : React.FC<{
    children: React.ReactNode
}> = ({children}) => {
  return (
    <div>
        <h1 className='bg-pink-600 text-white p-4'>Public Layout!</h1>
        <div className='flex flex-row gap-4 bg-gray-300 p-4'> 
            <div><Link to="/">Home</Link></div>
            <div><Link to="/about-us">About Us</Link></div>
            <div><Link to="/dashboard">Dashboard</Link></div>
            <div><Link to="/login">Login</Link></div>
        </div>
        <div className='p-4'>
            {children}
        </div>
    </div>
  )
}

export default PublicLayout