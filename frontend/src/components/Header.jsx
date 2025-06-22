import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center p-6"
    >
      <Link to="/" className="flex items-center gap-3">
        <div className="p-2 bg-purple-600/20 rounded-lg">
          <Zap className="text-purple-400" size={24} />
        </div>
        <span className="text-2xl font-bold text-white">HireFlow</span>
      </Link>
    </motion.header>
  );
};

export default Header;