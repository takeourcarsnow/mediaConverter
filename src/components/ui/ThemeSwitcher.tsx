'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

type ThemeOption = 'light' | 'dark' | 'system';

interface ThemeItem {
  value: ThemeOption;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const themeOptions: ThemeItem[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = themeOptions.find((opt) => opt.value === theme) || themeOptions[2];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-2.5 rounded-ios
          bg-ios-light-card dark:bg-ios-dark-card
          border border-ios-light-separator dark:border-ios-dark-separator
          text-ios-light-text dark:text-ios-dark-text
          hover:bg-ios-light-separator/30 dark:hover:bg-ios-dark-separator/30
          transition-ios
        `}
        aria-label="Toggle theme"
      >
        <CurrentIcon className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute right-0 mt-2 w-44
              bg-ios-light-card dark:bg-ios-dark-card
              rounded-ios-lg shadow-ios-lg
              border border-ios-light-separator dark:border-ios-dark-separator
              overflow-hidden z-50
            `}
          >
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = theme === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3
                    text-left transition-colors
                    ${isSelected 
                      ? 'bg-ios-light-blue/10 dark:bg-ios-dark-blue/10' 
                      : 'hover:bg-ios-light-separator/30 dark:hover:bg-ios-dark-separator/30'
                    }
                  `}
                >
                  <Icon 
                    className={`w-5 h-5 ${
                      isSelected 
                        ? 'text-ios-light-blue dark:text-ios-dark-blue' 
                        : 'text-ios-light-secondary dark:text-ios-dark-secondary'
                    }`} 
                  />
                  <span 
                    className={`flex-1 text-sm font-medium ${
                      isSelected 
                        ? 'text-ios-light-blue dark:text-ios-dark-blue' 
                        : 'text-ios-light-text dark:text-ios-dark-text'
                    }`}
                  >
                    {option.label}
                  </span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-ios-light-blue dark:text-ios-dark-blue" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
