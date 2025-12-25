'use client';

import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-ios-light-separator/50 dark:bg-ios-dark-separator/50 text-ios-light-text dark:text-ios-dark-text',
    success: 'bg-ios-light-green/15 dark:bg-ios-dark-green/15 text-ios-light-green dark:text-ios-dark-green',
    warning: 'bg-ios-light-orange/15 dark:bg-ios-dark-orange/15 text-ios-light-orange dark:text-ios-dark-orange',
    error: 'bg-ios-light-red/15 dark:bg-ios-dark-red/15 text-ios-light-red dark:text-ios-dark-red',
    info: 'bg-ios-light-blue/15 dark:bg-ios-dark-blue/15 text-ios-light-blue dark:text-ios-dark-blue',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

interface StatusDotProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export function StatusDot({ status, size = 'md', pulse = false }: StatusDotProps) {
  const statusColors = {
    online: 'bg-ios-light-green dark:bg-ios-dark-green',
    offline: 'bg-ios-light-secondary dark:bg-ios-dark-secondary',
    busy: 'bg-ios-light-red dark:bg-ios-dark-red',
    away: 'bg-ios-light-orange dark:bg-ios-dark-orange',
  };

  const sizeStyles = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <span className="relative inline-flex">
      <span
        className={`
          rounded-full
          ${statusColors[status]}
          ${sizeStyles[size]}
        `}
      />
      {pulse && (
        <motion.span
          className={`
            absolute inset-0 rounded-full
            ${statusColors[status]}
          `}
          initial={{ opacity: 0.75, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </span>
  );
}
