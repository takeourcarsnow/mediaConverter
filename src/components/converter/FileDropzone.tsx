'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileImage, FileVideo, Music, X, Plus } from 'lucide-react';
import { useConversionStore } from '@/store/conversionStore';
import { getAcceptString, isFileTypeSupported } from '@/lib/utils/mediaUtils';

interface FileDropzoneProps {
  compact?: boolean;
}

export function FileDropzone({ compact = false }: FileDropzoneProps) {
  const { addFiles } = useConversionStore();
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        setError('Some files were rejected. Please check file types.');
        return;
      }

      const supportedFiles = acceptedFiles.filter((file) =>
        isFileTypeSupported(file.type)
      );

      if (supportedFiles.length !== acceptedFiles.length) {
        setError('Some files are not supported.');
      }

      if (supportedFiles.length > 0) {
        addFiles(supportedFiles);
      }
    },
    [addFiles]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.avif'],
      'video/*': ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.mpeg', '.3gp'],
      'audio/*': ['.mp3', '.wav', '.aac', '.ogg', '.flac', '.m4a'],
    },
    multiple: true,
  });

  const rootProps = getRootProps();

  if (compact) {
    return (
      <div {...rootProps}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            cursor-pointer p-4 rounded-ios
            border-2 border-dashed
            transition-colors
            ${isDragActive
              ? 'border-ios-light-blue dark:border-ios-dark-blue bg-ios-light-blue/10 dark:bg-ios-dark-blue/10'
              : 'border-ios-light-separator dark:border-ios-dark-separator hover:border-ios-light-blue dark:hover:border-ios-dark-blue'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="flex items-center justify-center gap-2">
            <Plus className="w-5 h-5 text-ios-light-blue dark:text-ios-dark-blue" />
            <span className="text-sm font-medium text-ios-light-blue dark:text-ios-dark-blue">
              Add More Files
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div {...rootProps}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`
            relative cursor-pointer
            p-8 md:p-12 rounded-ios-xl
            border-2 border-dashed
            transition-all duration-300
            ${isDragActive
              ? 'border-ios-light-blue dark:border-ios-dark-blue bg-ios-light-blue/10 dark:bg-ios-dark-blue/10 scale-[1.02]'
              : isDragReject
              ? 'border-ios-light-red dark:border-ios-dark-red bg-ios-light-red/10 dark:bg-ios-dark-red/10'
              : 'border-ios-light-separator dark:border-ios-dark-separator hover:border-ios-light-blue dark:hover:border-ios-dark-blue bg-ios-light-card/50 dark:bg-ios-dark-card/50'
            }
          `}
        >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <motion.div
            animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
            className={`
              w-20 h-20 rounded-full mb-6
              flex items-center justify-center
              bg-gradient-to-br from-ios-light-blue/20 to-ios-light-purple/20 
              dark:from-ios-dark-blue/20 dark:to-ios-dark-purple/20
            `}
          >
            <Upload
              className={`
                w-10 h-10 
                ${isDragActive
                  ? 'text-ios-light-blue dark:text-ios-dark-blue'
                  : 'text-ios-light-secondary dark:text-ios-dark-secondary'
                }
              `}
            />
          </motion.div>

          {/* Text */}
          <AnimatePresence mode="wait">
            {isDragActive ? (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-xl font-semibold text-ios-light-blue dark:text-ios-dark-blue mb-2">
                  Drop your files here
                </p>
                <p className="text-ios-light-secondary dark:text-ios-dark-secondary">
                  Release to start converting
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="inactive"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-xl font-semibold mb-2">
                  Drag & drop your files here
                </p>
                <p className="text-ios-light-secondary dark:text-ios-dark-secondary mb-4">
                  or click to browse from your device
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Supported formats */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <FormatBadge icon={FileImage} label="Images" />
            <FormatBadge icon={FileVideo} label="Videos" />
            <FormatBadge icon={Music} label="Audio" />
          </div>
        </div>
        </motion.div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 rounded-ios bg-ios-light-red/10 dark:bg-ios-dark-red/10 flex items-center gap-2"
          >
            <X className="w-4 h-4 text-ios-light-red dark:text-ios-dark-red" />
            <span className="text-sm text-ios-light-red dark:text-ios-dark-red">
              {error}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FormatBadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

function FormatBadge({ icon: Icon, label }: FormatBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ios-light-separator/30 dark:bg-ios-dark-separator/30">
      <Icon className="w-4 h-4 text-ios-light-secondary dark:text-ios-dark-secondary" />
      <span className="text-xs font-medium text-ios-light-secondary dark:text-ios-dark-secondary">
        {label}
      </span>
    </div>
  );
}
