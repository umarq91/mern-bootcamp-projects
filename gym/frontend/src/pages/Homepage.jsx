import React from 'react';
import { FaUser, FaUserPlus, FaMoneyCheckAlt, FaDumbbell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomePage() {

  
  const data = [
    { label: 'User Info', url: "/admin/user-info", icon: <FaUser size={50} /> },
    { label: 'Add a Member', url: "/admin/add-member", icon: <FaUserPlus size={50} /> },
    { label: 'Pay Fee', url: "/admin/pay", icon: <FaMoneyCheckAlt size={50} /> },
    { label: 'Trainer / Coach', url: "/admin/trainer", icon: <FaDumbbell size={50} /> },
  ];
  
  return (
    <div 
      style={{backgroundImage: "url('https://t3.ftcdn.net/jpg/06/06/54/92/360_F_606549277_BMzgu4QoNfqHDkmUgngJrFHuxZXvkS7d.jpg')"}}
      className='min-h-screen bg-cover bg-center flex items-center justify-center'
    >
      <div className='bg-gray-900 bg-opacity-75 min-h-screen w-full'>
        <div className='max-w-7xl mx-auto min-h-screen p-5 md:px-20 '>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mt-20  gap-8'>
            {data.map((item, index) => (
              <Link 
                to={item.url}
                key={index} 
                className='h-[200px]  w-[80%] md:w-full cursor-pointer flex flex-col items-center justify-center p-5 bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl'
              > 
                <div className='text-blue-500 mb-4'>
                  {item.icon}
                </div>
                <div className='text-lg font-semibold text-gray-700'>
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
