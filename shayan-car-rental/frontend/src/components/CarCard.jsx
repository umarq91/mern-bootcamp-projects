import React from 'react';

const CarCard = ({ car }) => {
  return (
    <div className="max-w-sm hover:scale-110 transition-all transform hover:shadow-lg cusrpo rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={car.imageUrl} alt={car.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{car.name} - {car.model}</div>
        <p className="text-gray-700 text-base">{car.description}</p>
        <p className={`mt-2 ${car.availability === true ? 'text-green-500' : 'text-red-500'}`}>
          {car.availability ? "Available":"unavailable "}
        </p>
        <p className="mt-2 font-semibold">Price Per Day: {car.pricePerDay}</p>
        <p className="mt-2">Transmission: {car.transmission}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
            car.availability !== true && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={car.availability !== true}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
