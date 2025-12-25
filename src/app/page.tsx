'use client';

import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { HeroSection } from '@/components/home/HeroSection';
import { FeatureCards } from '@/components/home/FeatureCards';
import { ConversionWorkspace } from '@/components/converter/ConversionWorkspace';
import { useConversionStore } from '@/store/conversionStore';
import { motion, AnimatePresence } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { files } = useConversionStore();
  const hasFiles = files.length > 0;

  return (
    <main className="min-h-screen pb-24 md:pb-8">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!hasFiles ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection />
              <FeatureCards />
            </motion.div>
          ) : (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ConversionWorkspace />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Navigation />
    </main>
  );
}
