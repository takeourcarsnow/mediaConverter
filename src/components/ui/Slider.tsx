'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SliderProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  valueFormatter = (v) => String(v),
  disabled = false,
  className = '',
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label className="text-sm font-medium text-ios-light-secondary dark:text-ios-dark-secondary">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-ios-light-text dark:text-ios-dark-text">
              {valueFormatter(value)}
            </span>
          )}
        </div>
      )}
      <div className="relative h-6 flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-1 rounded-full bg-ios-light-separator dark:bg-ios-dark-separator" />
        
        {/* Active track */}
        <motion.div
          className="absolute left-0 h-1 rounded-full bg-ios-light-blue dark:bg-ios-dark-blue"
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={`
            absolute inset-0 w-full h-full opacity-0 cursor-pointer
            disabled:cursor-not-allowed
          `}
        />

        {/* Thumb */}
        <motion.div
          className={`
            absolute w-6 h-6 rounded-full
            bg-white dark:bg-ios-dark-card
            shadow-md border border-ios-light-separator/50 dark:border-ios-dark-separator
            pointer-events-none
          `}
          style={{ left: `calc(${percentage}% - 12px)` }}
          initial={false}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        />
      </div>
    </div>
  );
}

interface ToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}: ToggleProps) {
  return (
    <label
      className={`
        flex items-center justify-between cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {label && (
        <span className="text-base text-ios-light-text dark:text-ios-dark-text">
          {label}
        </span>
      )}
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          relative w-[51px] h-[31px] rounded-full
          transition-colors duration-200
          ${
            checked
              ? 'bg-ios-light-green dark:bg-ios-dark-green'
              : 'bg-ios-light-separator dark:bg-ios-dark-separator'
          }
        `}
      >
        <motion.div
          className="absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-md"
          initial={false}
          animate={{ left: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </label>
  );
}
