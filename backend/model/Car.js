const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    price: Number,
    mileage: { type: Number, default: 0 },
    transmission: { type: String, enum: ['Automatic', 'Manual'], default: 'Automatic' },
    fuelType: { type: String, enum: ['Electric', 'Hybrid', 'Gasoline'], default: 'Gasoline' },
    bodyType: { type: String, enum: ['SUV', 'Sedan', 'Coupe', 'Convertible'], default: 'Sedan' },
    engine: String,
    hp: { type: Number, default: 0 },
    acceleration: { type: String, default: '0s' },
    image: String,
    gallery: [String],
    features: [String],
    description: { type: String, default: '' },
    status: { type: String, enum: ['Available', 'Sold', 'Reserved'], default: 'Available' }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);