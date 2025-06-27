import React, { useState } from 'react';
import { CheckCircle, User, Mail, Hash, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import axios from 'axios';

const CredentialForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call - replace with actual API endpoint
    try {
      await axios.post('http://localhost:5678/webhook-test/update-onsite-interview', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen h-full bg-gradient-to-br from-background via-sidebar to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 px-6 lg:px-8 py-10 flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center w-20 h-20 bg-green-600/20 border border-green-600/30 rounded-full mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Thank You!
                  </h1>
                  <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Thank you for your patience. We will get back to you soon with further instructions for the hiring process.
                  </p>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-md mx-auto shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertCircle className="w-5 h-5 text-purple-400" />
                      <span className="text-sm font-medium text-purple-300">What's Next?</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Our team will review your credentials and contact you via email with the next steps in the hiring process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-background via-sidebar to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 px-6 lg:px-8 py-10 flex items-center justify-center">
          <div className="max-w-7xl w-full mx-auto h-full">
            <div className="grid lg:grid-cols-5 gap-10 h-full items-center min-h-[70vh]">
              <div className="lg:col-span-3 flex flex-col justify-center min-h-[400px]">
                <div className="mb-10">
                  <div className="flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 rounded-full px-4 py-2 mb-6 w-fit">
                    <User size={16} className="text-purple-400" />
                    <span className="text-purple-400 text-sm font-medium">Credential Verification</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Verify Your Credentials
                  </h1>
                  <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                    Please provide your credentials to proceed with the hiring process. 
                    Make sure the information matches exactly with what was provided to you.
                  </p>
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-base font-semibold text-yellow-300 mb-1">Important Note</h3>
                        <p className="text-sm text-yellow-200/80">
                          Your credentials should be exactly the same as filled in the form, and the User ID is the one mailed to you separately.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mt-0">
                  <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 min-h-[70px]">
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <Hash className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-0.5">User ID Verification</h3>
                      <p className="text-gray-400 text-xs">Enter the User ID that was mailed to you separately</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 min-h-[70px]">
                    <div className="p-2 bg-purple-600/20 rounded-lg">
                      <User className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-0.5">Personal Information</h3>
                      <p className="text-gray-400 text-xs">Provide your full name and email address</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 flex items-center justify-center min-h-[500px]">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/10 w-full max-w-md shadow-xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="userId" className="block text-sm font-medium text-purple-300 mb-2">
                        User ID <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                          type="text"
                          name="userId"
                          id="userId"
                          value={formData.userId}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-3 py-3 bg-black/60 border border-purple-800/50 rounded-lg text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none transition-colors text-base min-h-[48px]"
                          placeholder="Enter your User ID"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-3 py-3 bg-black/60 border border-purple-800/50 rounded-lg text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none transition-colors text-base min-h-[48px]"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-3 py-3 bg-black/60 border border-purple-800/50 rounded-lg text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none transition-colors text-base min-h-[48px]"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center py-3 text-base font-semibold bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:bg-gray-500 min-h-[48px]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Verifying...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 w-5 h-5" />
                            Verify Credentials
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CredentialForm; 