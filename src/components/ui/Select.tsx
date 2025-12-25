'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
}: SelectProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-ios-light-secondary dark:text-ios-dark-secondary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full appearance-none
            bg-ios-light-card dark:bg-ios-dark-card
            border border-ios-light-separator dark:border-ios-dark-separator
            rounded-ios px-4 py-3 pr-10
            text-ios-light-text dark:text-ios-dark-text
            focus:outline-none focus:ring-2 focus:ring-ios-light-blue dark:focus:ring-ios-dark-blue
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-ios
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ios-light-secondary dark:text-ios-dark-secondary pointer-events-none" />
      </div>
    </div>
  );
}

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className = '',
}: SegmentedControlProps) {
  return (
    <div
      className={`
        inline-flex p-1 rounded-ios
        bg-ios-light-separator/30 dark:bg-ios-dark-separator/30
        ${className}
      `}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-4 py-2 text-sm font-medium rounded-[10px] transition-all duration-200
            ${
              value === option.value
                ? 'bg-ios-light-card dark:bg-ios-dark-card text-ios-light-text dark:text-ios-dark-text shadow-sm'
                : 'text-ios-light-secondary dark:text-ios-dark-secondary hover:text-ios-light-text dark:hover:text-ios-dark-text'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
