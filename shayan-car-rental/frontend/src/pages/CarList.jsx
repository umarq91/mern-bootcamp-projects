import React, { useEffect, useState } from 'react';
import CarCard from "../components/CarCard";
import axios from 'axios';

const CarList = () => {
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cars');
        console.log(res);
        setCars(res.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    getCars();
  }, []);

  const filteredCars = cars.filter(car => {
    return (
      (selectedTransmission === 'All' || car.transmission === selectedTransmission) &&
      (selectedAvailability === 'All' || 
        (selectedAvailability === 'Available' && car.availability) || 
        (selectedAvailability === 'Unavailable' && !car.availability)
      )
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarList;
