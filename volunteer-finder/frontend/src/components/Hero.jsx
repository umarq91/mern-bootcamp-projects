import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center  text-white h-screen" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto h-full flex flex-col justify-center items-center relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
          Welcome to Our Website
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8">
          Discover the best services tailored for you.
        </p>
        <a href="#" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Get Started
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
