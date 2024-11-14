// src/components/BookingCard.js
import React from 'react';

const BookingCard = ({ booking }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">{booking.tourId.tourname}</h2>
            <p className="text-gray-600 mb-2">Location: {booking.tourId.location}</p>
            <p className="text-gray-600 mb-2">City: {booking.tourId.city}</p>
            <p className="text-gray-600 mb-2">Booked by: {booking.name}</p>
            <p className="text-gray-600 mb-2">Email: {booking.email}</p>
            <p className="text-gray-600 mb-2">Phone: {booking.phone}</p>
            <p className="text-gray-600 mb-2">People: {booking.people}</p>
            <p className="text-gray-600 mb-2">Total Bill: {booking.bill}</p>
            <div className="text-sm text-gray-500 mt-2">
                <span>Booking Date: {new Date(booking.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default BookingCard;
