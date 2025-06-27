import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AtSign, Lock, Eye, EyeOff, User, Mail } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      if (activeTab === 'login') {
        const res = await axios.post('/api/hr/login', {
          email: formData.email,
          password: formData.password
        });
        if (res.data.success) {
          setSuccess('Login successful!');
          setTimeout(() => navigate('/dashboard'), 1000);
        } else {
          setError(res.data.error || 'Login failed');
        }
      } else {
        // Simulate signup or implement real signup if needed
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuccess('Signup successful!');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    // Handle Google authentication
    console.log('Google auth clicked');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-md"
    >
      <div className="bg-white/10 backdrop-blur-2xl shadow-2xl border border-white/20 p-6 rounded-xl">
        {/* Tab Navigation */}
        <div className="flex mb-6 bg-white/5 rounded-lg p-1">
          <button
            className={`flex-1 py-2 px-4 font-semibold text-sm transition-all ${
              activeTab === 'login'
                ? 'bg-purple-600 text-white rounded-md shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 px-4 font-semibold text-sm transition-all ${
              activeTab === 'signup'
                ? 'bg-purple-600 text-white rounded-md shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {activeTab === 'login' ? (
          // Login Tab
          <div className="space-y-4">
            {error && <div className="text-red-400 text-sm font-medium">{error}</div>}
            {success && <div className="text-green-400 text-sm font-medium">{success}</div>}
            {/* Email Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Email Address</label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/60 focus:border-transparent transition-all text-base"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/60 focus:border-transparent transition-all text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 bg-transparent border-gray-400 rounded focus:ring-purple-600"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="#" className="text-purple-400 hover:underline text-sm">Forgot password?</a>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold text-white text-base bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg transition-all relative overflow-hidden disabled:opacity-50"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </motion.button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center rounded-2xl">
                <div className="w-full border-t border-white/20 "></div>
              </div>
              <div className="relative flex justify-center text-sm ">
                <span className="px-2 bg-white/10 text-gray-400 rounded-lg">or continue with</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button 
              onClick={handleGoogleAuth}
              className="w-full bg-white hover:bg-gray-50 rounded-lg p-3 transition-all border-none flex items-center justify-center gap-3 text-base font-medium text-gray-800 shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        ) : (
          // Signup Tab
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/60 focus:border-transparent transition-all text-base"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/60 focus:border-transparent transition-all text-base"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300 font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a password"
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/60 focus:border-transparent transition-all text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 text-purple-600 bg-transparent border-gray-400 rounded focus:ring-purple-600"
                  required
                />
                <label className="text-sm text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-purple-400 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold text-white text-base bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg transition-all relative overflow-hidden disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </form>
          </div>
        )}

        {/* Footer */}
        
      </div>
    </motion.div>
  );
};

export default LoginForm;