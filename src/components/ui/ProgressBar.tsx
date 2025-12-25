'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'orange' | 'purple';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  progress,
  size = 'md',
  color = 'blue',
  showLabel = false,
  animated = true,
  className = '',
}: ProgressBarProps) {
  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorStyles = {
    blue: 'bg-ios-light-blue dark:bg-ios-dark-blue',
    green: 'bg-ios-light-green dark:bg-ios-dark-green',
    orange: 'bg-ios-light-orange dark:bg-ios-dark-orange',
    purple: 'bg-ios-light-purple dark:bg-ios-dark-purple',
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          w-full rounded-full overflow-hidden
          bg-ios-light-separator dark:bg-ios-dark-separator
          ${sizeStyles[size]}
        `}
      >
        <motion.div
          className={`
            h-full rounded-full relative overflow-hidden
            ${colorStyles[color]}
            ${animated ? 'progress-shine' : ''}
          `}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <span className="absolute right-0 -top-6 text-sm font-medium text-ios-light-secondary dark:text-ios-dark-secondary">
          {Math.round(clampedProgress)}%
        </span>
      )}
    </div>
  );
}

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: 'blue' | 'green' | 'orange' | 'purple';
  showLabel?: boolean;
  className?: string;
}

export function CircularProgress({
  progress,
  size = 48,
  strokeWidth = 4,
  color = 'blue',
  showLabel = true,
  className = '',
}: CircularProgressProps) {
  const colorStyles = {
    blue: 'text-ios-light-blue dark:text-ios-dark-blue',
    green: 'text-ios-light-green dark:text-ios-dark-green',
    orange: 'text-ios-light-orange dark:text-ios-dark-orange',
    purple: 'text-ios-light-purple dark:text-ios-dark-purple',
  };

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-ios-light-separator dark:text-ios-dark-separator"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={colorStyles[color]}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-xs font-semibold">
          {Math.round(clampedProgress)}%
        </span>
      )}
    </div>
  );
}
