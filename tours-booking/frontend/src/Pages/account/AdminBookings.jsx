import React, { useEffect, useState } from "react";
import BookingCard from "../../Components/BookingCard";
import AccountNav from "../../Components/Extra/AccountNav";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings");
        setBookings(response.data.bookings);
        setFilteredBookings(response.data.bookings); // Initialize filtered bookings
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter((booking) =>
        booking.tourId.tourname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
  }, [searchQuery, bookings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l2.545-1.466A6.978 6.978 0 014 12H0c0 2.69 1.338 5.066 3.355 6.526l1.645-1.235z"
            ></path>
          </svg>
          <span className="text-gray-600 text-lg">Loading bookings...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 lg:p-12 mt-12 max-w-6xl mx-auto">
      <AccountNav />
      <h1 className="text-3xl font-semibold mb-6 text-center">All Bookings</h1>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by tour name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Total Results Count */}
      <div className="mb-4 text-gray-700">
        {searchQuery.trim() === "" ? (
          <p>Total Bookings: {bookings.length}</p>
        ) : (
          <p>
            Showing {filteredBookings.length} result(s) for "{searchQuery}"
          </p>
        )}
      </div>
      {/* Filtered Bookings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No bookings found for "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminBookings;
