const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Car = require('./model/Car');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access token required' 
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                success: false, 
                message: 'Invalid or expired token' 
            });
        }
        req.user = user;
        next();
    });
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB Connected"));

// --- ROUTES ---

// Admin Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET);
        const user = {
            id: 'admin',
            email: email,
            name: 'Administrator',
            role: 'admin'
        };
        return res.json({ 
            success: true, 
            token, 
            user 
        });
    }
    res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
    });
});

// Get single car
app.get('/api/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ 
                success: false, 
                message: "Car not found" 
            });
        }
        // Transform _id to id for frontend compatibility
        const transformedCar = {
            ...car.toObject(),
            id: car._id.toString()
        };
        res.json(transformedCar);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});

// Get all cars
app.get('/api/cars', async (req, res) => {
    const cars = await Car.find();
    // Transform _id to id for frontend compatibility
    const transformedCars = cars.map(car => ({
        ...car.toObject(),
        id: car._id.toString()
    }));
    res.json(transformedCars);
});

// Add a car (Protected)
app.post('/api/cars', authenticateToken, async (req, res) => {
    const newCar = new Car(req.body);
    await newCar.save();
    res.json(newCar);
});

// Delete a car (Protected)
app.delete('/api/cars/:id', authenticateToken, async (req, res) => {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5050, () => console.log("Server running on port 5050"));