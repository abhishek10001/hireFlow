import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import LoginForm from '../components/LoginForm';

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
        {/* Right: LoginForm Component */}
        <div className="flex flex-col justify-center items-center h-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;


