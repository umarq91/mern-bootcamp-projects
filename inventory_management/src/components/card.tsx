import { CarData } from "@/Types";
import React from "react";



interface CardsProps {
  data: CarData[];
}

export const Card: React.FC<{ car: CarData }> = ({ car }) => {
  return (
    <div className="relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 duration-300">
      {/* Car Image */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          // Todo : fix src according  to final
          src={
            `${process.env.NEXT_PUBLIC_SUPABASE_IMG}${car.image}`
          }
          alt={car.name}
        />

        {/* Status Tag (Available or Sold) */}
        <span
          className={`absolute top-2 right-2 px-3 py-1 text-sm font-bold rounded ${
            car.status === "available"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {car.status === "available" ? "Available" : "Sold"}
        </span>
      </div>

      {/* Car Details */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {car.name} {car.model} ({car.year})
        </div>
        <p className="text-gray-700 text-base mb-2">{car.description}</p>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <strong>Fault:</strong> {car.fault}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Used:</strong> {car.used ? "Yes" : "No"}
          </p>
        </div>
      </div>

      {/* Sell Price */}
      <div className="px-6 py-4">
        <div className="text-lg font-semibold text-gray-800">
          Sell Price: ${car.sellPrice}
        </div>
      </div>
    </div>
  );
};

const Cards: React.FC<CardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((car) => (
        <Card key={car.id} car={car} />
      ))}
    </div>
  );
};

export default Cards;
