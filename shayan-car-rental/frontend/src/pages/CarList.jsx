import React, { useState } from 'react';
import CarCard from "../components/CarCard"
const CarList = () => {
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  const cars = [
    {
      name: "Toyota Corolla",
      model: "2021",
      description: "Reliable and fuel-efficient sedan.",
      availability: "Available",
      pricePerHour: "PKR 2000",
      imageUrl: "https://pictures.dealer.com/n/northcutttoyotagst/1290/dc5045f66f7971381692be516990e029x.jpg",
      transmission: "Automatic",
    },
    {
      name: "Honda Civic",
      model: "2020",
      description: "Sporty and comfortable ride.",
      availability: "Unavailable",
      pricePerHour: "PKR 2500",
      imageUrl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-honda-civic-hatchback-102-1565880890.jpg?crop=1.00xw:0.918xh;0,0.0128xh&resize=980:*",
      transmission: "Manual",
    },
    {
      name: "BMW 3 Series",
      model: "2022",
      description: "Luxury sedan with premium features.",
      availability: "Available",
      pricePerHour: "PKR 5000",
      imageUrl: "https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1652776711/autoexpress/2022/05/BMW%203%20Series%20facelift%202022-5.jpg",
      transmission: "Automatic",
    },
    {
      name: "Audi A4",
      model: "2021",
      description: "Premium sedan with advanced features.",
      availability: "Available",
      pricePerHour: "PKR 5500",
      imageUrl: "https://www.cnet.com/a/img/resize/5a655ac0a04a183ed508b586cec7a6d97e18f64d/hub/2021/01/14/20adf66d-e7c0-48a5-890b-594d571b44f4/a4-ogi.jpg?auto=webp&fit=crop&height=675&width=1200",
      transmission: "Manual",
    },
  ];

  const filteredCars = cars.filter(car => {
    return (
      (selectedTransmission === 'All' || car.transmission === selectedTransmission) &&
      (selectedAvailability === 'All' || car.availability === selectedAvailability)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Car List</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-4">
          <select
            value={selectedTransmission}
            onChange={(e) => setSelectedTransmission(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="All">All Transmissions</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>

          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarList;
