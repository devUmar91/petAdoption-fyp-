import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/auth/register', { name, email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className=" mx-auto bg-gray-200 py-[130px]">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19a2 2 0 01-2-2H5a2 2 0 01-2-2V8a2 2 0 012-2h8a2 2 0 012 2h6a2 2 0 012 2v4a2 2 0 01-2 2h-6a2 2 0 01-2 2zM19 8a2 2 0 00-2-2h-6a2 2 0 00-2 2H5a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12l4.25 4.25M12 12L7.75 16.25M12 12L17.25 7.75M12 12L6 6.25M2.5 12c.8-2.3 2.3-4.3 4.3-6.3m8.4 8.3c1.4 1.4 2.8 2.7 4.3 3.8M21.5 12c-1.4 2.3-3.3 4.3-5.6 5.7M5.8 4.5c2.7 2.4 5.8 4.3 8.8 5.8M12 12l-6 6" />
                </svg>
              )}
            </button>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
