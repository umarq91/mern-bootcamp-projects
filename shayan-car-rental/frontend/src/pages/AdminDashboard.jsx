import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { MdOutlineCarRental } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [editCar, setEditCar] = useState(null);
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState({
    name: '',
    model: '',
    description: '',
    availability: '',
    pricePerDay: '',
    imageUrl: '',
    transmission: '',
  });

  useEffect(() => {
    const getCars = async () => {
      const res = await axios.get('http://localhost:5000/api/cars');
      setCars(res.data);
    };
    getCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id)); // Update to use _id from MongoDB
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleEdit = (car) => {
    setEditCar(car._id);
    setCarDetails(car);
  };

  const handleChange = (e) => {
    setCarDetails({ ...carDetails, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      console.log(editCar);
      
      const res = await axios.put(`http://localhost:5000/api/cars/${editCar}`, carDetails);
      setCars(
        cars.map((car) => (car._id === editCar ? res.data : car))
      );
      setEditCar(null);
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleCancel = () => {
    setEditCar(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className='flex  justify-between'>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          <MdOutlineCarRental className="inline-block text-blue-500 mr-2" />
          My Car Listings
        </h2>
    <button onClick={() => navigate('/admin/add')} className='bg-blue-500 py-1 px-6 my-2 hover:bg-green-600 font-semibold rounded-xl text-white'> Add A Car  </button>
    <button onClick={() => navigate('/admin/bookings')} className='bg-blue-500 py-1 px-6 my-2 hover:bg-green-600 font-semibold rounded-xl text-white'> Bookings  </button>
         
          </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car Name
                </th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price Per Day
                </th>
                <th className="py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-t">
                  <td className="py-4 px-6">{car.name}</td>
                  <td className="py-4 px-6">{car.model}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        car.availability === true
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {car.availability ? 'Available' : 'Not Available'}
                    </span>
                  </td>
                  <td className="py-4 px-6">Rs. {car.pricePerDay}/day</td>
                  <td className="py-4 px-6">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-4"
                      onClick={() => handleEdit(car)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(car._id)}
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editCar && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Car</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Car Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={carDetails.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={carDetails.model}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={carDetails.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={carDetails.availability}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price Per Day
                  </label>
                  <input
                    type="number"
                    name="pricePerDay"
                    value={carDetails.pricePerDay}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={carDetails.imageUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={carDetails.transmission}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Manual">Manual</option>
                  <option value="Auto">Auto</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
