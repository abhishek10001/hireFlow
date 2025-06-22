import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6 text-white" />, 
    title: 'AI-Powered Screening',
    description: 'Advanced machine learning algorithms automatically evaluate and score candidates, saving you hours of manual review.'
  },
  {
    icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 00-4-4H3m0 0a9 9 0 0118 0m-2 0h-2a4 4 0 00-4 4v2" /></svg>,
    title: 'Real-time Analytics',
    description: 'Comprehensive dashboards with interactive charts to track your hiring pipeline and performance metrics.'
  },
];

const benefits = [
  'Trusted by top tech companies worldwide',
  'Reduce time-to-hire by 50%',
  'Seamless integration with your HR tools',
  'AI-driven candidate matching',
];

const  LandingPage = () => {
  const [benefitIdx, setBenefitIdx] = useState(0);
  const [isLogin, setIsLogin] = useState(true);
  const [useEmail, setUseEmail] = useState(false);
  React.useEffect(() => {
    const interval = setInterval(() => setBenefitIdx(i => (i + 1) % benefits.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-[#0D0D0D] via-[#18181b] to-[#4C1D95] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Animated background gradients */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 bg-gradient-to-tr from-[#A259FF]/30 via-transparent to-[#D946EF]/20 blur-2xl"
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 py-0 items-center h-screen">
        {/* Left: Hero & Features */}
        <div className="flex flex-col justify-center h-full">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-8">
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-gradient-to-br from-primary to-accent rounded-2xl p-3 shadow-lg">
              <Zap className="w-8 h-8 text-white drop-shadow-lg" />
            </motion.div>
            <span className="text-4xl font-extrabold text-white tracking-tight">HireFlow</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Next-generation <span className="text-primary">AI-powered</span> hiring platform
            <br />that transforms your recruitment process
          </motion.h1>
          <div className="space-y-6 mb-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md border border-white/10 hover:scale-[1.03] hover:shadow-xl transition-all"
              >
                <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-2 flex items-center justify-center">
                  {f.icon}
                </div>
                <div>
                  <div className="text-lg font-semibold text-white mb-1">{f.title}</div>
                  <div className="text-textSecondary text-sm max-w-xs">{f.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Animated benefit carousel */}
          <motion.div
            key={benefitIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-lg text-white/90 text-center bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl py-3 px-6 shadow-inner"
          >
            {benefits[benefitIdx]}
          </motion.div>
        </div>
        {/* Right: Glassmorphic Login/SignUp Card */}
        <div className="flex flex-col justify-center items-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-16 flex flex-col gap-10"
          >
            {/* Animated toggle */}
            <div className="flex w-full mb-8 relative">
              <button className={`flex-1 py-3 font-semibold text-xl transition-colors ${isLogin ? 'text-primary' : 'text-gray-400'}`} onClick={() => setIsLogin(true)}>
                Login
              </button>
              <button className={`flex-1 py-3 font-semibold text-xl transition-colors ${!isLogin ? 'text-primary' : 'text-gray-400'}`} onClick={() => setIsLogin(false)}>
                Sign Up
              </button>
              <motion.span
                layout
                className="absolute bottom-0 left-0 h-1 w-1/2 bg-gradient-to-r from-primary to-accent rounded transition-transform duration-300"
                animate={{ x: isLogin ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </div>
            {/* Toggle for Google/Email */}
            <div className="flex justify-center gap-4 mb-4">
              <button
                className={`px-6 py-2 rounded-full font-semibold text-lg transition-colors border-2 ${!useEmail ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary border-primary/40'} shadow ${!useEmail ? 'shadow-lg' : ''}`}
                onClick={() => setUseEmail(false)}
              >
                Google
              </button>
              <button
                className={`px-6 py-2 rounded-full font-semibold text-lg transition-colors border-2 ${useEmail ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary border-primary/40'} shadow ${useEmail ? 'shadow-lg' : ''}`}
                onClick={() => setUseEmail(true)}
              >
                Email
              </button>
            </div>
            {/* Form or Google Sign In */}
            {!useEmail ? (
              <div className="flex flex-col items-center gap-8 w-full">
                <button className="bg-primary hover:bg-accent rounded-2xl p-6 transition-all border-none flex items-center gap-4 text-2xl font-semibold text-white shadow-xl w-full justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 24 24"><path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34D399" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBF24" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  <span>Sign in with Google</span>
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-lg text-textSecondary">Email Address</label>
                  <motion.input
                    whileFocus={{ boxShadow: '0 0 0 2px #A259FF' }}
                    type="email"
                    placeholder="your.email@company.com"
                    className="w-full px-6 py-4 bg-background border border-primary/40 rounded-2xl text-white placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/60 text-lg transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-lg text-textSecondary">Password</label>
                  <motion.input
                    whileFocus={{ boxShadow: '0 0 0 2px #A259FF' }}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-6 py-4 bg-background border border-primary/40 rounded-2xl text-white placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary/60 text-lg transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 16px 4px #A259FF' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl font-bold text-white text-xl bg-gradient-to-r from-primary to-accent shadow-lg transition-all relative overflow-hidden"
                  type="submit"
                >
                  <span className="relative z-10">Sign In</span>
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-accent blur-lg opacity-0 hover:opacity-60 transition-opacity duration-300" />
                </motion.button>
              </form>
            )}
            {/* Testimonials/Logos */}
            <div className="flex justify-center gap-8 mt-8 opacity-80">
              <img src="/client1.svg" alt="Client 1" className="h-10 grayscale hover:grayscale-0 transition" />
              <img src="/client2.svg" alt="Client 2" className="h-10 grayscale hover:grayscale-0 transition" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;


