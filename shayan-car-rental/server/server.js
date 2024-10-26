// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');

const cors = require('cors');
const BookingModel = require('./models/booking');
dotenv.config();
const app = express();
app.use(cors())

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
// Booking
app.post('/api/booking', async (req, res) => {
  const { name, email, message, dateNeeded, daysNeeded, carId ,bill} = req.body;
console.log(req.body);

  try {
    const booking =await BookingModel.create({
      userName:name,
      userEmail:email,
      message,
      bill,
      dateNeeded,
      daysNeeded,
      carId,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate('carId'); // Populating carId for car details
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
