// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  dateNeeded: {
    type: Date,
    required: true,
  }, bill: {
    type: Number,
    required: true,
  },
  daysNeeded: {
    type: Number,
    required: true,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car', // Assuming you have a Car model
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
