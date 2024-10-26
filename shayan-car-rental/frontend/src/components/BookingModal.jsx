// BookingModal.jsx
import React, { useState } from 'react';

const BookingModal = ({ car, onClose }) => {
  const [userName, setUserName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [bookingDate, setBookingDate] = useState('');

  const handleQuoteRequest = () => {
    // Here you can add the functionality to send the booking request
    alert('Booking request submitted!');
    onClose(); // Close the modal after submitting
  };

  const whatsappNumber = '+923139188007'; // WhatsApp number

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=I%20would%20like%20to%20book%20the%20${car.name}%20for%20${car.pricePerDay}.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-4">Booking Request for {car.name}</h2>
        <form className="space-y-4">
          <input
            type="text"
            value={car.name}
            readOnly
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <input
            type="email"
            placeholder="Contact Email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </form>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleQuoteRequest}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Request a Quote
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Contact Us on WhatsApp
          </a>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
