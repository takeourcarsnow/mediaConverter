'use client';

import { motion } from 'framer-motion';
import { Image, Video, Film, Music, Wand2, Shrink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const features: FeatureCard[] = [
  {
    id: 'images',
    title: 'Image Conversion',
    description: 'Convert between JPEG, PNG, WebP, GIF, AVIF and more formats',
    icon: Image,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'videos',
    title: 'Video Conversion',
    description: 'Transform videos to MP4, WebM, MOV with quality control',
    icon: Video,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'gifs',
    title: 'GIF Creator',
    description: 'Turn any video into animated GIFs with custom settings',
    icon: Film,
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    id: 'audio',
    title: 'Audio Extraction',
    description: 'Extract and convert audio from videos to MP3, WAV, AAC',
    icon: Music,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'optimize',
    title: 'Smart Optimization',
    description: 'Automatically optimize media for web and social platforms',
    icon: Wand2,
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'compress',
    title: 'Compression',
    description: 'Reduce file sizes while maintaining visual quality',
    icon: Shrink,
    gradient: 'from-red-500 to-pink-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FeatureCards() {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold mb-2">Everything You Need</h2>
        <p className="text-ios-light-secondary dark:text-ios-dark-secondary">
          Professional-grade media tools at your fingertips
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.id} variants={itemVariants}>
              <Card hover className="h-full">
                <CardContent>
                  <div
                    className={`
                      w-12 h-12 rounded-ios mb-4
                      bg-gradient-to-br ${feature.gradient}
                      flex items-center justify-center
                      shadow-lg
                    `}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-ios-light-secondary dark:text-ios-dark-secondary">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
