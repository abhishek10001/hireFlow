import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = 'px-4 py-2 rounded-xl font-semibold transition';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/80',
    secondary: 'bg-card text-primary border border-primary hover:bg-primary/10',
    danger: 'bg-error text-white hover:bg-error/80',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button; 