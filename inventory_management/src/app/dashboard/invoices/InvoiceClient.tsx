"use client";

import { useState } from "react";

interface Car {
  name: string;
  sellPrice: number;
  soldon: string;
}

interface InvoiceClientProps {
  soldCars: Car[];
  total: number;
}

const InvoiceClient: React.FC<InvoiceClientProps> = ({ soldCars, total }) => {
  const [filters, setFilters] = useState({ month: 0, year: 0 });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: Number(value) });
  };

  const filteredCars = soldCars.filter((car) => {
    const soldDate = new Date(car.soldon);
    const matchesMonth = filters.month
      ? soldDate.getMonth() + 1 === filters.month
      : true;
    const matchesYear = filters.year
      ? soldDate.getFullYear() === filters.year
      : true;
    return matchesMonth && matchesYear;
  });

  const filteredTotal = filteredCars.reduce(
    (acc, car) => acc + (car.sellPrice || 0),
    0
  );

  return (
    <div>
      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div>
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700"
          >
            Month
          </label>
          <select
            name="month"
            value={filters.month || ""}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300"
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(0, month - 1).toLocaleString("en", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Year
          </label>
          <input
            type="number"
            name="year"
            value={filters.year || ""}
            onChange={handleInputChange}
            className="mt-1 p-3 block w-full rounded-md border border-gray-300"
            min={2024}
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Car Name</th>
            <th className="text-right p-4">Sell Price</th>
            <th className="text-right p-4">Sold On</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.map((car) => (
            <tr key={car.name} className="border-t border-gray-200">
              <td className="p-4">{car.name}</td>
              <td className="text-right p-4">${car.sellPrice}</td>
              <td className="text-right p-4">
                {new Date(car.soldon).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {filteredCars.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center p-4">
                No cars sold in this period.
              </td>
            </tr>
          )}
        </tbody>
        {filteredCars.length !== 0 && (
          <tfoot>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="p-4 font-bold">Total</td>
              <td className="text-right p-4 font-bold">${filteredTotal}</td>
              <td className="p-4"></td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default InvoiceClient;
