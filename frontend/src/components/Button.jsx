import React from 'react';

const Button = ({ children, variant = 'primary', className = '', href, ...props }) => {
  const base = 'px-4 py-2 rounded-xl font-semibold transition';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/80',
    secondary: 'bg-card text-primary border border-primary hover:bg-primary/10',
    danger: 'bg-error text-white hover:bg-error/80',
  };
  if (href) {
    return (
      <a
        className={`${base} ${variants[variant]} ${className}`}
        href={href}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button; 