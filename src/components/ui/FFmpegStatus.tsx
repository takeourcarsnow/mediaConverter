'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useFFmpeg } from '@/providers/FFmpegProvider';

export function FFmpegStatus() {
  const { isLoaded, isLoading, loadError } = useFFmpeg();

  if (loadError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ios-light-red/10 dark:bg-ios-dark-red/10"
      >
        <AlertCircle className="w-4 h-4 text-ios-light-red dark:text-ios-dark-red" />
        <span className="text-xs font-medium text-ios-light-red dark:text-ios-dark-red">
          Error
        </span>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ios-light-orange/10 dark:bg-ios-dark-orange/10"
      >
        <Loader2 className="w-4 h-4 text-ios-light-orange dark:text-ios-dark-orange animate-spin" />
        <span className="text-xs font-medium text-ios-light-orange dark:text-ios-dark-orange">
          Loading...
        </span>
      </motion.div>
    );
  }

  if (isLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ios-light-green/10 dark:bg-ios-dark-green/10"
      >
        <CheckCircle className="w-4 h-4 text-ios-light-green dark:text-ios-dark-green" />
        <span className="text-xs font-medium text-ios-light-green dark:text-ios-dark-green">
          Ready
        </span>
      </motion.div>
    );
  }

  return null;
}
