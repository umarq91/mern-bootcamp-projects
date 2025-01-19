"use client";

import { useEffect, useState } from "react";
import Cards from "@/components/card";
import { useAtom } from "jotai";
import { carAtom } from "@/store";
import { useCars } from "@/CarContext";
import { CarData } from "@/Types";

function CarsData() {
  const [carsAtom,setCarsAtom]  = useAtom(carAtom)
  const [cars] = useState(carsAtom);
  const [filteredCars, setFilteredCars] = useState(cars);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterCars(query, statusFilter);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterCars(searchQuery, status);
  };

  const filterCars = (query: string, status: string) => {
    let filtered = cars.filter((car:CarData) => car.name.toLowerCase().includes(query));

    if (status !== "all") {
      filtered = filtered.filter((car:CarData) => car.status.toLowerCase() === status);
    }

    setFilteredCars(filtered);
  };
console.log(cars);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Car Listings</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by car name..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />

        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="all">All Cars</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      {/* Cars Listing */}
      {filteredCars.length >  0 ? (
        <Cards data={filteredCars as any} />
      ) : (
        <div className="text-center text-gray-500">No cars found.</div>
      )}
    </div>
  );
}

export default CarsData;
