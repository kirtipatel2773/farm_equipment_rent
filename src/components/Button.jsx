import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-agri-primary hover:bg-[#076e35] text-white shadow-sm hover:shadow focus:ring-agri-primary active:scale-[0.98]',
    secondary: 'bg-agri-light hover:bg-[#d8eedf] text-agri-dark border border-agri-primary/20 focus:ring-agri-primary active:scale-[0.98]',
    outline: 'border border-agri-border bg-white text-agri-text hover:bg-gray-50 hover:border-agri-primary/40 focus:ring-agri-primary',
    ghost: 'text-agri-text hover:bg-agri-light/60 hover:text-agri-primary focus:ring-agri-primary',
    accent: 'bg-agri-accent hover:bg-[#d99f38] text-white shadow-sm focus:ring-agri-accent',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
