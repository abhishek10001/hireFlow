import React from 'react';


const FeatureCard = ({ icon: Icon, title, description, gradient }) => {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
        <div className={`w-8 h-8 ${gradient} rounded-xl flex items-center justify-center mb-4`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    );
  };

  export default FeatureCard;