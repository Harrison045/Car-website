import React, { useState } from 'react';
import { adminAuthService } from '../../services/adminAuthService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const result = await adminAuthService.login(email, password);
            
            if (result.success) {
                window.location.href = '/admin/dashboard';
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-black">
            <form onSubmit={handleLogin} className="bg-gray-900 p-10 rounded border border-yellow-500">
                <h2 className="text-white text-2xl mb-5">Admin Login</h2>
                
                {error && (
                    <div className="bg-red-500 text-white p-3 mb-4 rounded">
                        {error}
                    </div>
                )}
                
                <input 
                    className="block w-full p-2 mb-4 bg-gray-800 text-white" 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                <input 
                    className="block w-full p-2 mb-4 bg-gray-800 text-white" 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={isLoading}
                />
                <button 
                    className="w-full bg-yellow-500 p-2 font-bold disabled:bg-gray-600" 
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'LOGGING IN...' : 'LOGIN'}
                </button>
            </form>
        </div>
    );
};
export default Login;