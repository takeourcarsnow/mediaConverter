'use client';

import { motion } from 'framer-motion';
import {
  Image,
  Video,
  Music,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Download,
  Play,
} from 'lucide-react';
import { ConversionFile } from '@/types';
import { formatBytes } from '@/lib/utils/format';
import { CircularProgress } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

interface FileItemProps {
  file: ConversionFile;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onDownload?: () => void;
}

export function FileItem({
  file,
  isSelected,
  onSelect,
  onRemove,
  onDownload,
}: FileItemProps) {
  const getIcon = () => {
    switch (file.type) {
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'audio':
        return Music;
      default:
        return Image;
    }
  };

  const Icon = getIcon();

  const getStatusBadge = () => {
    switch (file.status) {
      case 'pending':
        return <Badge variant="default" size="sm">Pending</Badge>;
      case 'processing':
        return <Badge variant="info" size="sm">Converting</Badge>;
      case 'completed':
        return <Badge variant="success" size="sm">Done</Badge>;
      case 'error':
        return <Badge variant="error" size="sm">Failed</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case 'processing':
        return <CircularProgress progress={file.progress} size={36} strokeWidth={3} />;
      case 'completed':
        return (
          <div className="w-9 h-9 rounded-full bg-ios-light-green/20 dark:bg-ios-dark-green/20 flex items-center justify-center">
            <Check className="w-5 h-5 text-ios-light-green dark:text-ios-dark-green" />
          </div>
        );
      case 'error':
        return (
          <div className="w-9 h-9 rounded-full bg-ios-light-red/20 dark:bg-ios-dark-red/20 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-ios-light-red dark:text-ios-dark-red" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ scale: 1.01 }}
      onClick={onSelect}
      className={`
        relative p-3 rounded-ios-lg cursor-pointer
        transition-all duration-200
        ${isSelected
          ? 'bg-ios-light-blue/10 dark:bg-ios-dark-blue/10 ring-2 ring-ios-light-blue dark:ring-ios-dark-blue'
          : 'bg-ios-light-card dark:bg-ios-dark-card hover:bg-ios-light-separator/20 dark:hover:bg-ios-dark-separator/20'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Preview / Icon */}
        <div className="relative w-14 h-14 rounded-ios overflow-hidden bg-ios-light-separator/30 dark:bg-ios-dark-separator/30 flex-shrink-0">
          {file.preview && file.type !== 'audio' ? (
            <>
              {file.type === 'video' ? (
                <video
                  src={file.preview}
                  className="w-full h-full object-cover"
                  muted
                />
              ) : (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              )}
              {file.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-5 h-5 text-white" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon className="w-6 h-6 text-ios-light-secondary dark:text-ios-dark-secondary" />
            </div>
          )}
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {file.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-ios-light-secondary dark:text-ios-dark-secondary">
              {formatBytes(file.size)}
            </span>
            {file.outputSize && file.status === 'completed' && (
              <>
                <span className="text-xs text-ios-light-secondary dark:text-ios-dark-secondary">→</span>
                <span className="text-xs text-ios-light-green dark:text-ios-dark-green font-medium">
                  {formatBytes(file.outputSize)}
                </span>
              </>
            )}
          </div>
          <div className="mt-1.5">
            {getStatusBadge()}
          </div>
        </div>

        {/* Status / Actions */}
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          
          {file.status === 'completed' && onDownload && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              className="p-2 rounded-full bg-ios-light-blue/10 dark:bg-ios-dark-blue/10 text-ios-light-blue dark:text-ios-dark-blue hover:bg-ios-light-blue/20 dark:hover:bg-ios-dark-blue/20 transition-colors"
            >
              <Download className="w-5 h-5" />
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-2 rounded-full hover:bg-ios-light-red/10 dark:hover:bg-ios-dark-red/10 text-ios-light-secondary dark:text-ios-dark-secondary hover:text-ios-light-red dark:hover:text-ios-dark-red transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Error message */}
      {file.error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 text-xs text-ios-light-red dark:text-ios-dark-red"
        >
          {file.error}
        </motion.p>
      )}
    </motion.div>
  );
}
