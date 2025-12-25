'use client';

import React, { ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-semibold rounded-ios transition-ios
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
  `;

  const variantStyles = {
    primary: `
      bg-ios-light-blue dark:bg-ios-dark-blue 
      text-white 
      hover:opacity-90
      focus:ring-ios-light-blue dark:focus:ring-ios-dark-blue
    `,
    secondary: `
      bg-ios-light-card dark:bg-ios-dark-card 
      text-ios-light-text dark:text-ios-dark-text
      border border-ios-light-separator dark:border-ios-dark-separator
      hover:bg-ios-light-separator/20 dark:hover:bg-ios-dark-separator/20
      focus:ring-ios-light-secondary
    `,
    ghost: `
      bg-transparent 
      text-ios-light-blue dark:text-ios-dark-blue
      hover:bg-ios-light-blue/10 dark:hover:bg-ios-dark-blue/10
      focus:ring-ios-light-blue dark:focus:ring-ios-dark-blue
    `,
    danger: `
      bg-ios-light-red dark:bg-ios-dark-red 
      text-white 
      hover:opacity-90
      focus:ring-ios-light-red dark:focus:ring-ios-dark-red
    `,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {rightIcon}
    </motion.button>
  );
}
