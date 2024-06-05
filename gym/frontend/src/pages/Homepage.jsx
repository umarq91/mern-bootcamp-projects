import React from 'react';
import { FaUser, FaUserPlus, FaMoneyCheckAlt, FaDumbbell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomePage() {
  const data = [
    { label: 'User Info', url: "/admin/user-info", icon: <FaUser size={50} /> },
    { label: 'Add a Member', url: "/admin/add-member", icon: <FaUserPlus size={50} /> },
    { label: 'Pay Fee', url: "/admin/pay", icon: <FaMoneyCheckAlt size={50} /> },
    { label: 'Trainer / Coach', url: "", icon: <FaDumbbell size={50} /> },
  ];
  

  return (
    <div className='bg-gray-200 min-h-screen '>
      <div className='max-w-7xl mx-auto min-h-screen p-5 md:px-20'>
        <div className='grid grid-cols-1  gap-4 '>
          {data.map((item, index) => (
            <Link 
            to={item.url}
              key={index} 
              className='h-[200px] cursor-pointer flex flex-col items-center justify-center p-5 bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl'
            > 
              <div className='text-blue-500 mb-4'>
                {item.icon}
              </div>
              <div className='text-lg font-semibold'>
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
