import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data);
      } catch (err) {
        setError('Error fetching bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader text-2xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        All Bookings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking, index) => (
          <div key={index} className="border border-gray-200 p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{booking?.carId.name}</h2>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                {booking?.userName[0]}
              </div>
              <span className="text-lg font-medium text-gray-700">{booking?.userName}</span>
            </div>
            <p className="text-gray-600 mb-2"><strong>Email:</strong> {booking?.userEmail}</p>
            <p className="text-gray-600 mb-2"><strong>Message:</strong> {booking?.message}</p>
            <p className="text-gray-600 mb-2"><strong>Date Needed:</strong> {new Date(booking?.dateNeeded).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2"><strong>Days Needed:</strong> {booking?.daysNeeded}</p>
            <p className="text-lg font-semibold text-gray-800"><strong>Bill:</strong> RS. {booking?.bill || 2000}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
