import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import axios from "axios";

const CarList = () => {
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    message: "",
    bill:"",
    dateNeeded: "",
    daysNeeded: "", // New state variable for number of days
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getCars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cars");
        console.log(res);
        setCars(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    getCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesTransmission =
      selectedTransmission === "All" ||
      car.transmission === selectedTransmission;
    const matchesAvailability =
      selectedAvailability === "All" ||
      (selectedAvailability === "Available" && car.availability) ||
      (selectedAvailability === "Unavailable" && !car.availability);
    const matchesSearchTerm = car.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesTransmission && matchesAvailability && matchesSearchTerm;
  });

  const handleBooking = (car) => {
    setSelectedCar(car);
    setUserInfo({
      name: "",
      email: "",
      message: "",
      bill:"",
      dateNeeded: "",
      daysNeeded: "",
    }); // Reset all fields
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    await axios.post("http://localhost:5000/api/booking", {
      ...userInfo,
      carId: selectedCar?._id
      ,bill:selectedCar.pricePerDay*userInfo.daysNeeded 
    });

    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpen = (car) => {
    setIsModalOpen(true);
    setSelectedCar(car);
  };

  const openWhatsApp = () => {
    if (selectedCar) {
      const phoneNumber = "+923139188007"; // Replace with your phone number (without + and 0)
      const message = `Hi, I'm interested in the ${selectedCar.name} that costs ${selectedCar.pricePerDay} per day.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
        "_blank"
      );
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Explore Our Car Collection
      </h1>

      {/* Filters */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <select
            value={selectedTransmission}
            onChange={(e) => setSelectedTransmission(e.target.value)}
            className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded shadow-sm focus:ring focus:ring-indigo-200"
          >
            <option value="All">All Transmissions</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>

          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded shadow-sm focus:ring focus:ring-indigo-200"
          >
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          {/* Search */}
          <input
            type="text"
            className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded shadow-sm focus:ring focus:ring-indigo-200 w-[200px] lg:w-[450px]"
            placeholder="Search Cars"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car, index) => (
          <div key={index} onClick={() => handleOpen(car)}>
            <CarCard car={car} onBook={handleBooking} />
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed overflow-y-auto inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              Booking for {selectedCar.name}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 w-full rounded shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 w-full rounded shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={userInfo.message}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 w-full rounded shadow-sm"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Date Needed</label>
                <input
                  type="date"
                  name="dateNeeded"
                  value={userInfo.dateNeeded}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 w-full rounded shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  How Many Days
                </label>
                <input
                  type="number"
                  name="daysNeeded"
                  defaultValue={"1"}
                  value={userInfo.daysNeeded}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-4 py-2 w-full rounded shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Request a Quote
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="ml-4 my-6 bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={openWhatsApp}
                className="ml-4 mt-2 bg-green-500 text-white font-bold py-2 px-4 rounded"
              >
                Message on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;
