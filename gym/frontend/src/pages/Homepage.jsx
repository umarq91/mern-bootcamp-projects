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
      style={{ backgroundImage: "url('https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg')", filter: 'brightness(80%)' }}
      className='min-h-screen bg-cover bg-center flex items-center justify-center'
    >
      <div className='bg-white bg-opacity-20 min-h-screen w-full'>
        <div className='max-w-7xl mx-auto min-h-screen p-5 md:px-20'>
          <h1 className='text-4xl lg:text-6xl font-bold text-white text-center mb-10'>
            Welcome To My Gym App
          </h1>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20'>
            {data.map((item, index) => (
              <Link 
                to={item.url}
                key={index}
                className='h-[220px] w-[90%] md:w-full cursor-pointer flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 group'
              >
                <div className='text-indigo-500 mb-4 transition-colors group-hover:text-indigo-600'>
                  {item.icon}
                </div>
                <div className='text-lg font-semibold text-gray-700 group-hover:text-gray-900'>
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
