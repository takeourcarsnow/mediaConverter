'use client';

import { motion } from 'framer-motion';
import { Home, Image, Video, Film, Settings } from 'lucide-react';
import { useState } from 'react';
import { useConversionStore } from '@/store/conversionStore';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'gifs', label: 'GIFs', icon: Film },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Navigation() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass bg-ios-light-card/90 dark:bg-ios-dark-card/90 border-t border-ios-light-separator/50 dark:border-ios-dark-separator/50 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center w-full h-full gap-1 transition-ios"
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive
                      ? 'text-ios-light-blue dark:text-ios-dark-blue'
                      : 'text-ios-light-secondary dark:text-ios-dark-secondary'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-ios-light-blue dark:bg-ios-dark-blue transform -translate-x-1/2"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive
                    ? 'text-ios-light-blue dark:text-ios-dark-blue'
                    : 'text-ios-light-secondary dark:text-ios-dark-secondary'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
