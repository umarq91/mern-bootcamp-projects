"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import Cards from "@/components/card";

interface CarData {
  id: string;
  name: string;
  model: string;
  year: number;
  description: string;
  fault: string;
  used: boolean;
  status: string;
  purchasePrice: number;
  sellPrice: number;
  soldon?: string;
  image: string;
}

function CarsData() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("cars").select("*");

        if (error) {
          setError(error.message);
        } else {
          setCars(data || []);
          setFilteredCars(data || []);
        }
      } catch (err) {
        setError("Failed to fetch car data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    let filtered = cars.filter((car) =>
      car.name.toLowerCase().includes(query)
    );

    if (status !== "all") {
      filtered = filtered.filter((car) => car.status.toLowerCase() === status);
    }

    setFilteredCars(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

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
      {filteredCars.length > 0 ? (
        <Cards data={filteredCars} />
      ) : (
        <div className="text-center text-gray-500">No cars found.</div>
      )}
    </div>
  );
}

export default CarsData;
