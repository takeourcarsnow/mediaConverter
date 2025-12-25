'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Trash2, RefreshCw, ArrowLeft } from 'lucide-react';
import { useConversionStore } from '@/store/conversionStore';
import { useMediaConversion } from '@/hooks/useMediaConversion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { formatBytes } from '@/lib/utils/format';

export function ConversionActions() {
  const { files, clearFiles, isConverting } = useConversionStore();
  const {
    isLoaded,
    isLoading: isLoadingFFmpeg,
    convertAllFiles,
    downloadAllFiles,
  } = useMediaConversion();

  const stats = useMemo(() => {
    const pending = files.filter((f) => f.status === 'pending').length;
    const processing = files.filter((f) => f.status === 'processing').length;
    const completed = files.filter((f) => f.status === 'completed').length;
    const failed = files.filter((f) => f.status === 'error').length;

    const originalSize = files.reduce((acc, f) => acc + f.size, 0);
    const outputSize = files
      .filter((f) => f.outputSize)
      .reduce((acc, f) => acc + (f.outputSize || 0), 0);

    return { pending, processing, completed, failed, originalSize, outputSize };
  }, [files]);

  const canConvert = stats.pending > 0 && isLoaded && !isConverting;
  const canDownload = stats.completed > 0;
  const hasInProgress = stats.processing > 0;

  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <StatBox label="Total Files" value={files.length} />
          <StatBox
            label="Completed"
            value={stats.completed}
            color="green"
          />
          <StatBox
            label="Original Size"
            value={formatBytes(stats.originalSize)}
            isText
          />
          <StatBox
            label="Output Size"
            value={stats.outputSize > 0 ? formatBytes(stats.outputSize) : '-'}
            color={stats.outputSize < stats.originalSize ? 'green' : undefined}
            isText
          />
        </div>

        {/* Size savings */}
        {stats.outputSize > 0 && stats.outputSize < stats.originalSize && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-ios bg-ios-light-green/10 dark:bg-ios-dark-green/10 text-center"
          >
            <p className="text-sm font-medium text-ios-light-green dark:text-ios-dark-green">
              🎉 Saved {formatBytes(stats.originalSize - stats.outputSize)} (
              {Math.round((1 - stats.outputSize / stats.originalSize) * 100)}% smaller)
            </p>
          </motion.div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button
            fullWidth
            onClick={convertAllFiles}
            disabled={!canConvert}
            isLoading={isConverting || isLoadingFFmpeg || hasInProgress}
            leftIcon={<Play className="w-5 h-5" />}
          >
            {isLoadingFFmpeg
              ? 'Loading FFmpeg...'
              : hasInProgress
              ? 'Converting...'
              : `Convert ${stats.pending > 0 ? stats.pending : 'All'} File${stats.pending !== 1 ? 's' : ''}`}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              onClick={downloadAllFiles}
              disabled={!canDownload}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download All
            </Button>
            <Button
              variant="ghost"
              onClick={clearFiles}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Start Over
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatBoxProps {
  label: string;
  value: string | number;
  color?: 'green' | 'orange' | 'red';
  isText?: boolean;
}

function StatBox({ label, value, color, isText }: StatBoxProps) {
  const colorClasses = {
    green: 'text-ios-light-green dark:text-ios-dark-green',
    orange: 'text-ios-light-orange dark:text-ios-dark-orange',
    red: 'text-ios-light-red dark:text-ios-dark-red',
  };

  return (
    <div className="p-3 rounded-ios bg-ios-light-separator/20 dark:bg-ios-dark-separator/20">
      <p className="text-xs text-ios-light-secondary dark:text-ios-dark-secondary mb-1">
        {label}
      </p>
      <p
        className={`text-lg font-semibold ${color ? colorClasses[color] : ''}`}
      >
        {value}
      </p>
    </div>
  );
}
