import React from 'react';
import { FaUser, FaUserPlus, FaMoneyCheckAlt, FaDumbbell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HomePage() {
  const data = [
    { label: 'User Info', url: "/admin/user-info", icon: <FaUser size={50} /> },
    { label: 'Add a Member', url: "/admin/add-member", icon: <FaUserPlus size={50} /> },
    { label: 'Pay Fee', url: "/admin/pay", icon: <FaMoneyCheckAlt size={50} /> },
    { label: 'Trainer / Coach', url: "/admin/trainer", icon: <FaDumbbell size={50} /> },
    { label: 'BMI Calculator', url: "/admin/bmi", icon: <FaDumbbell size={50} /> },
    { label: 'Annoucements', url: "/admin/annoucements", icon: <FaDumbbell size={50} /> },

  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const sliderImages = [
    {
      image: "https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg",
      text: "Join our community of fitness enthusiasts!",
    },
    {
      image: "https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114193.jpg",
      text: "Expert trainers to guide you on your journey!",
    },
    {
      image: "https://mrwallpaper.com/images/hd/gym-motivation-movie-ruu7q29ozktj58q7.jpg",
      text: "Achieve your goals with personalized plans!",
    },
  ];

  // Array of gradients for each card
  const gradients = [
    'bg-gradient-to-r from-blue-500 to-purple-500',
    'bg-gradient-to-r from-green-400 to-blue-500',
    'bg-gradient-to-r from-red-400 to-yellow-500',
    'bg-gradient-to-r from-pink-500 to-red-500',
    'bg-gradient-to-r from-indigo-500 to-green-500',
  ];

  return (
    <div
      style={{ backgroundImage: "url('https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg')", filter: 'brightness(80%)' }}
      className='min-h-screen bg-cover bg-center flex flex-col'
    >
      <div className='bg-white bg-opacity-20 min-h-screen w-full overflow-y-auto'>
        <div className='max-w-7xl mx-auto min-h-screen p-5 md:px-20'>
          <h1 className='text-4xl lg:text-6xl font-bold text-white text-center mb-10'>
            Welcome To My Gym Web App
          </h1>

          {/* Slider Section */}
          <div className='mb-10'>
            <Slider {...sliderSettings}>
              {sliderImages.map((item, index) => (
                <div key={index} className='flex max-h-[400px] items-center justify-center w-full relative'>
                  <img
                    src={item.image}
                    alt={`Slide ${index + 1}`}
                    className='w-full h-auto object-cover rounded-lg'
                  />
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className='absolute inset-0 flex items-center justify-center text-white font-bold text-2xl'>
                    {item.text}
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className='grid grid-cols-1 font-poppins md:grid-cols-2  gap-10 mt-20'>
            {data.map((item, index) => (
              <Link
                to={item.url}
                key={index}
                className={`h-[420px] w-[90%] md:w-full cursor-pointer flex flex-col items-center justify-center p-6 shadow-lg rounded-xl transform transition-transform hover:scale-105 hover:shadow-2xl ${gradients[index % gradients.length]}`}
              >
                <div className='text-white mb-4 transition-colors group-hover:text-indigo-200'>
                  {item.icon}
                </div>
                <div className='text-4xl lg:text-6xl font-semibold text-white group-hover:text-gray-900'>
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
