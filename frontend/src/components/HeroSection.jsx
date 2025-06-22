import React from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, Zap, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: 'AI-Powered Screening',
      description: 'Advanced algorithms automatically evaluate candidates'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      title: 'Real-time Analytics',
      description: 'Track your hiring pipeline with interactive dashboards'
    },
   
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col justify-center h-full"
    >
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-2 bg-purple-600/10 border border-purple-600/20 rounded-full px-4 py-2 mb-6 w-fit"
        >
          <Zap size={16} className="text-purple-400" />
          <span className="text-purple-400 text-sm font-medium">The Future of Recruitment</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Hire <span className="text-purple-400">Smarter</span>,<br />
          Not Harder
        </motion.h1>

        {/* <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
        >
          Transform your recruitment process with AI-powered insights, automated screening, and data-driven hiring decisions that help you build winning teams.
        </motion.p> */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2 text-purple-400">
            <CheckCircle size={20} />
            <span className="text-sm font-medium">Trusted by 500+ companies</span>
          </div>
          <div className="flex items-center gap-2 text-purple-400">
            <CheckCircle size={20} />
            <span className="text-sm font-medium">50% faster hiring</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-4"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            className="flex h-30 items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-600/30 transition-all duration-300"
          >
            <div className="p-2 bg-purple-600/20 rounded-lg">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;