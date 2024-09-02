const mongoose = require('mongoose');

// Define the schema for a car
const carSchema = mongoose.Schema({
    name: String,
    model: Number,
    description: String,
    pricePerDay: Number,
    availability: Boolean,
    imageUrl: String,
    transmission: {
        type: String,
        enum: ['Manual', 'Automatic']
    }
});

// Export the model using the schema
module.exports = mongoose.model('Car', carSchema);
