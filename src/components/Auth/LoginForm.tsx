import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { apiClient } from '../../api/client';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password required');
      }

      // Call backend login endpoint
      const response = await apiClient.login({
        email,
        password,
      });

      // Store user and token
      setUser(response.user);
      setToken(response.access_token);

      // Navigate to products page
      navigate('/products');
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* AliExpress Banner Strip */}
      <div 
        className="relative w-full py-8 overflow-hidden"
        style={{
          backgroundImage: 'url("/images/aliexpress-banner.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#dc2626',
        }}
      >
        {/* Banner Content */}
        <div className="h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white" style={{
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5), -2px -2px 8px rgba(0, 0, 0, 0.3)'
          }}>
            AliExpress
          </h1>
        </div>
        
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-red-600 to-orange-500"></div>
      </div>

      {/* Login Form Container */}
      <div className="px-6 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-8">
            Sign in to your account
          </h2>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password (min 8 chars, uppercase, digit, special char)
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-medium text-red-600 hover:text-red-500"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
