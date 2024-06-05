import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    
  return (
    <div className=' flex justify-center items-center w-full'>
            <div className='p-2'> 
              <Link to={"/"} className='p-2  text-blue-500 border-2 border-blue-500 rounded'>Dashboard</Link>
            </div>
    </div>
  )
}

export default Navbar