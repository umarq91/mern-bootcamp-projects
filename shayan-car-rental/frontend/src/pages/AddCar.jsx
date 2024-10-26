import React, { useState } from 'react';
import axios from "axios"
const AddCar = () => {
  const [car, setCar] = useState({
    name: '',
    model: '',
    description: '',
    availability: true,
    pricePerDay: '',
    imageUrl: '',
    transmission: 'Manual',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCar({
      ...car,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox for availability
    });
    console.log(car);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send a POST request to the backend with the car data
      const res = await axios.post('http://localhost:5000/api/cars', car);
      console.log(res.data); // Log the response data to check if the car was added successfully
  
      // Optionally, you can reset the form after successful submission
      setCar({
        name: '',
        model: '',
        description: '',
        availability: '',
        pricePerDay: '',
        imageUrl: '',
        transmission: 'Manual',
      });
  
      // You can also add a success message or redirect the user if needed
      alert('Car added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add the car. Please try again.');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add a New Car</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Car Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="name"
            type="text"
            name="name"
            value={car.name}
            onChange={handleChange}
            placeholder="Enter car name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
            Model
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="model"
            type="number"
            name="model"
            value={car.model}
            onChange={handleChange}
            placeholder="Enter model year"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="description"
            name="description"
            value={car.description}
            onChange={handleChange}
            placeholder="Enter car description"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
            Availability
          </label>
          <input
            className="mr-2 leading-tight"
            id="availability"
            type="checkbox"
            name="availability"
            checked={car.availability}
            onChange={handleChange}
          />
          <span className="text-sm text-gray-600">
            Available
          </span>
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerDay">
            Price Per Day
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="pricePerDay"
            type="number"
            name="pricePerDay"
            value={car.pricePerDay}
            onChange={handleChange}
            placeholder="Enter price per hour"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="imageUrl"
            type="text"
            name="imageUrl"
            value={car.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transmission">
            Transmission
          </label>
          <select
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="transmission"
            name="transmission"
            value={car.transmission}
            onChange={handleChange}
            required
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Auto</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
