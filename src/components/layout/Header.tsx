'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Sparkles } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { FFmpegStatus } from '@/components/ui/FFmpegStatus';

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass bg-ios-light-bg/80 dark:bg-ios-dark-bg/80 border-b border-ios-light-separator/50 dark:border-ios-dark-separator/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-9 h-9 rounded-ios bg-gradient-to-br from-ios-light-blue to-ios-light-purple dark:from-ios-dark-blue dark:to-ios-dark-purple flex items-center justify-center shadow-ios">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              MediaFlow
            </span>
          </motion.div>

          {/* Right section */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FFmpegStatus />
            <ThemeSwitcher />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
