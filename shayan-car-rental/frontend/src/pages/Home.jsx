import React, { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  // const cars = [
  //   {
  //     name: "Toyota Corolla",
  //     model: "2021",
  //     description: "Reliable and fuel-efficient sedan.",
  //     availability: "Available",
  //     pricePerHour: "PKR 2000",
  //     imageUrl: "https://pictures.dealer.com/n/northcutttoyotagst/1290/dc5045f66f7971381692be516990e029x.jpg",
  //     transmission: "Automatic",
  //   },
  //   {
  //     name: "Honda Civic",
  //     model: "2020",
  //     description: "Sporty and comfortable ride.",
  //     availability: "Unavailable",
  //     pricePerHour: "PKR 2500",
  //     imageUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-honda-civic-hatchback-102-1565880890.jpg?crop=1.00xw:0.918xh;0,0.0128xh&resize=980:*",
  //     transmission: "Manual",
  //   },
  //   {
  //     name: "BMW 3 Series",
  //     model: "2022",
  //     description: "Luxury sedan with premium features.",
  //     availability: "Available",
  //     pricePerHour: "PKR 5000",
  //     imageUrl: "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1652776711/autoexpress/2022/05/BMW%203%20Series%20facelift%202022-5.jpg",
  //     transmission: "Automatic",
  //   },
  // ];
  const [cars,setCars] = useState([])

  useEffect(()=>{
      const getCars=async()=>{
    const res =     await axios.get('http://localhost:5000/api/cars')
        console.log(res);
        setCars(res.data.slice(0, 3));
        
  }
  getCars()
  },[])

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Star Car Rental</h1>
        <p className="text-lg text-gray-600">Find the perfect car for your journey with our wide selection of premium vehicles.</p>
      </div>
      
      {/* Featured Cars Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Featured Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Link to="/cars" className="inline-block px-8 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-all duration-200">
          View All Cars
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
