'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colors = {
  success: {
    bg: 'bg-ios-light-green/10 dark:bg-ios-dark-green/10',
    border: 'border-ios-light-green/20 dark:border-ios-dark-green/20',
    icon: 'text-ios-light-green dark:text-ios-dark-green',
  },
  error: {
    bg: 'bg-ios-light-red/10 dark:bg-ios-dark-red/10',
    border: 'border-ios-light-red/20 dark:border-ios-dark-red/20',
    icon: 'text-ios-light-red dark:text-ios-dark-red',
  },
  warning: {
    bg: 'bg-ios-light-orange/10 dark:bg-ios-dark-orange/10',
    border: 'border-ios-light-orange/20 dark:border-ios-dark-orange/20',
    icon: 'text-ios-light-orange dark:text-ios-dark-orange',
  },
  info: {
    bg: 'bg-ios-light-blue/10 dark:bg-ios-dark-blue/10',
    border: 'border-ios-light-blue/20 dark:border-ios-dark-blue/20',
    icon: 'text-ios-light-blue dark:text-ios-dark-blue',
  },
};

export function Toast({ id, type, message, duration = 4000, onClose }: ToastProps) {
  const Icon = icons[type];
  const colorStyles = colors[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`
        flex items-center gap-3 px-4 py-3
        rounded-ios-lg shadow-ios-lg
        bg-ios-light-card dark:bg-ios-dark-card
        border ${colorStyles.border}
        max-w-sm w-full
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${colorStyles.icon}`} />
      <p className="flex-1 text-sm text-ios-light-text dark:text-ios-dark-text">
        {message}
      </p>
      <button
        onClick={() => onClose(id)}
        className="p-1 rounded-full hover:bg-ios-light-separator/30 dark:hover:bg-ios-dark-separator/30 transition-colors"
      >
        <X className="w-4 h-4 text-ios-light-secondary dark:text-ios-dark-secondary" />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Array<{ id: string; type: ToastType; message: string }>;
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
