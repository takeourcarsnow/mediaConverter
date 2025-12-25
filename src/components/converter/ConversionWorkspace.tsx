'use client';

import { motion } from 'framer-motion';
import { FileList } from './FileList';
import { FilePreview } from './FilePreview';
import { ConversionSettings } from './ConversionSettings';
import { ConversionActions } from './ConversionActions';
import { useIsMobile } from '@/hooks/useWindowSize';

export function ConversionWorkspace() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="py-6 space-y-6">
        {/* File List */}
        <section>
          <FileList />
        </section>

        {/* Preview */}
        <section>
          <FilePreview />
        </section>

        {/* Settings */}
        <section>
          <ConversionSettings />
        </section>

        {/* Actions */}
        <section>
          <ConversionActions />
        </section>
      </div>
    );
  }

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-12 gap-6"
      >
        {/* Left column - File list */}
        <div className="col-span-4 space-y-6">
          <FileList />
          <ConversionActions />
        </div>

        {/* Middle column - Preview */}
        <div className="col-span-5">
          <FilePreview />
        </div>

        {/* Right column - Settings */}
        <div className="col-span-3">
          <ConversionSettings />
        </div>
      </motion.div>
    </div>
  );
}
