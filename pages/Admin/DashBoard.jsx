import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { adminAuthService } from '../../services/adminAuthService';

// Create axios instance for consistency
const apiClient = axios.create({
  baseURL: 'http://localhost:5050/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const Dashboard = () => {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ 
        make: '', 
        model: '', 
        price: '', 
        year: '',
        image: '', 
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        bodyType: 'Sedan',
        mileage: '0',
        hp: '0',
        acceleration: '0s',
        engine: '',
        description: '',
        status: 'Available'
    });

    useEffect(() => {
        // Check if user is authenticated
        if (!adminAuthService.isAuthenticated()) {
            window.location.href = '/admin/login';
            return;
        }
        
        // Test API connection
        const testConnection = async () => {
            try {
                const headers = adminAuthService.getAuthHeaders();
                const res = await apiClient.get('/cars', { headers });
                console.log('API test successful:', res.data);
                setCars(res.data);
            } catch (err) {
                console.error('API test failed:', err);
            }
        };

        testConnection();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const headers = adminAuthService.getAuthHeaders();
            const res = await apiClient.post('/cars', form, { headers });
            setForm({ 
                make: '', 
                model: '', 
                price: '', 
                year: '',
                image: '', 
                fuelType: 'Gasoline',
                transmission: 'Automatic',
                bodyType: 'Sedan',
                mileage: '0',
                hp: '0',
                acceleration: '0s',
                engine: '',
                description: '',
                status: 'Available'
            });
            fetchCars();
        } catch (err) {
            setError('Failed to add car');
            console.error('Error adding car:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        adminAuthService.logout();
        window.location.href = '/admin/login';
    };

    const fetchCars = async () => {
        try {
            const headers = adminAuthService.getAuthHeaders();
            const res = await apiClient.get('/cars', { headers });
            setCars(res.data);
        } catch (err) {
            console.error('Error fetching cars:', err);
        }
    };

    const deleteCar = async (id) => {
        try {
            const headers = adminAuthService.getAuthHeaders();
            await apiClient.delete(`/cars/${id}`, { headers });
            fetchCars();
        } catch (err) {
            console.error('Error deleting car:', err);
        }
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
            <div className="bg-white p-6 shadow">
                <h2 className="text-xl font-bold mb-4">Dashboard Loaded Successfully!</h2>
                <p>Admin authentication is working. Ready to add car management features.</p>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Make:</label>
                            <input 
                                type="text" 
                                value={form.make} 
                                onChange={(e) => setForm({ ...form, make: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Model:</label>
                            <input 
                                type="text" 
                                value={form.model} 
                                onChange={(e) => setForm({ ...form, model: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price:</label>
                            <input 
                                type="number" 
                                value={form.price} 
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Year:</label>
                            <input 
                                type="number" 
                                value={form.year} 
                                onChange={(e) => setForm({ ...form, year: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image:</label>
                            <input 
                                type="text" 
                                value={form.image} 
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fuel Type:</label>
                            <select 
                                value={form.fuelType} 
                                onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="Gasoline">Gasoline</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Transmission:</label>
                            <select 
                                value={form.transmission} 
                                onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Body Type:</label>
                            <select 
                                value={form.bodyType} 
                                onChange={(e) => setForm({ ...form, bodyType: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Truck">Truck</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mileage:</label>
                            <input 
                                type="number" 
                                value={form.mileage} 
                                onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">HP:</label>
                            <input 
                                type="number" 
                                value={form.hp} 
                                onChange={(e) => setForm({ ...form, hp: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Acceleration:</label>
                            <input 
                                type="text" 
                                value={form.acceleration} 
                                onChange={(e) => setForm({ ...form, acceleration: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Engine:</label>
                            <input 
                                type="text" 
                                value={form.engine} 
                                onChange={(e) => setForm({ ...form, engine: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description:</label>
                            <textarea 
                                value={form.description} 
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Add Car
                    </button>
                </form>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {cars.map(car => (
                        <div key={car._id} className="bg-white p-4 shadow">
                            <img src={car.image} className="w-full h-32 object-cover" alt="" />
                            <h3 className="font-bold">{car.make} {car.model}</h3>
                            <p>${car.price}</p>
                            <p className="text-sm text-gray-600">{car.year} • {car.fuelType} • {car.transmission}</p>
                            <button 
                                onClick={() => deleteCar(car._id)} 
                                className="text-red-500 mt-2 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
