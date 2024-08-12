import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../store/auth-context'

const PublicLayout : React.FC<{
    children: React.ReactNode
}> = ({children}) => {
  const authCtx = useContext(AuthContext);
  return (
    <div>
        <h1 className='bg-pink-600 text-white p-4 text-2xl'>Home Page</h1>
        <div className='flex flex-row gap-4 bg-gray-300 p-4'> 
            <div><Link to="/">Home</Link></div>
            <div><Link to="/about-us">About Us</Link></div>         
            {
              authCtx.authData.isAuth && (
                <div><Link to="/dashboard">Dashboard</Link></div>
              )
            }
            <div className='flex-auto'></div>
            {!authCtx.authData.isAuth ? (
              <div><Link to="/login" className='font-semibold'>Login</Link></div>
            ) : (
              <div><button onClick={authCtx.logout} className='font-semibold'>Logout</button></div>
            )
            }
            
        </div>
        <div className='p-4'>
            {children}
        </div>
    </div>
  )
}

export default PublicLayout