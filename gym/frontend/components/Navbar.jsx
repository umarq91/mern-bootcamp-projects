import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='w-full bg-white mb-20 bg-opacity-20 backdrop-blur-md fixed top-0 left-0 shadow-md z-50'>
      <div className='flex justify-center items-center p-4'>
        <a 
          href={"/"} 
          className='text-lg font-semibold text-blue-600 border-2 border-blue-600 py-2 px-5 rounded-full transition-colors duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md'
        >
          Dashboard
        </a>
      </div>
    </div>
  );
}

export default Navbar;
