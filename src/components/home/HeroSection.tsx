'use client';

import { motion } from 'framer-motion';
import { Upload, Sparkles, Zap, Shield } from 'lucide-react';
import { FileDropzone } from '@/components/converter/FileDropzone';

export function HeroSection() {
  return (
    <section className="py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        {/* Decorative badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ios-light-blue/10 dark:bg-ios-dark-blue/10 mb-6"
        >
          <Sparkles className="w-4 h-4 text-ios-light-blue dark:text-ios-dark-blue" />
          <span className="text-sm font-medium text-ios-light-blue dark:text-ios-dark-blue">
            Powered by FFmpeg
          </span>
        </motion.div>

        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-ios-light-text to-ios-light-secondary dark:from-ios-dark-text dark:to-ios-dark-secondary bg-clip-text text-transparent">
          Convert Your Media
          <br />
          <span className="bg-gradient-to-r from-ios-light-blue to-ios-light-purple dark:from-ios-dark-blue dark:to-ios-dark-purple bg-clip-text text-transparent">
            Instantly & Privately
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg text-ios-light-secondary dark:text-ios-dark-secondary max-w-xl mx-auto">
          Transform photos, videos, and create GIFs right in your browser.
          No uploads, no waiting—everything happens locally.
        </p>
      </motion.div>

      {/* Dropzone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FileDropzone />
      </motion.div>

      {/* Feature highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-6 mt-8"
      >
        {[
          { icon: Zap, text: 'Lightning Fast' },
          { icon: Shield, text: '100% Private' },
          { icon: Upload, text: 'No Size Limits' },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-ios-light-secondary dark:text-ios-dark-secondary"
          >
            <item.icon className="w-4 h-4 text-ios-light-blue dark:text-ios-dark-blue" />
            <span>{item.text}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
