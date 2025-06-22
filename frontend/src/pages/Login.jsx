import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-sidebar to-black relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main className="px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
                <HeroSection />
              </div>
              <div className="lg:col-span-2">
                <LoginForm />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login; 

// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login