import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../components/Alerts/Toast";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Please fill out both fields.');
      showWarningToast("Please fill out both fields.");
      return;
    }

    setError('');
    setLoading(true);

    try {
      await register(username, password);
      showSuccessToast("Registration successful!");
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data.error === 'Username is already taken') {
        setError('Username is already taken.');
        showWarningToast("Username is already taken.");
      } else {
        setError('Registration failed. Please try again.');
        showErrorToast("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>

        <form className="space-y-4">
          <div className="input-group">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex justify-between items-center">
            <button
              type="button"
              className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <a href="/login" className="text-blue-500 hover:underline"> Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
