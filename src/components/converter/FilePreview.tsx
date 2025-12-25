'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Image, Video, Music, Play, Download, Maximize2 } from 'lucide-react';
import { useConversionStore } from '@/store/conversionStore';
import { useMediaConversion } from '@/hooks/useMediaConversion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatBytes } from '@/lib/utils/format';

export function FilePreview() {
  const { files, selectedFileId } = useConversionStore();
  const { downloadFile } = useMediaConversion();

  const selectedFile = useMemo(
    () => files.find((f) => f.id === selectedFileId),
    [files, selectedFileId]
  );

  if (!selectedFile) {
    return (
      <Card className="h-full min-h-[300px] flex items-center justify-center">
        <CardContent className="text-center">
          <div className="w-16 h-16 rounded-full bg-ios-light-separator/30 dark:bg-ios-dark-separator/30 flex items-center justify-center mx-auto mb-4">
            <Image className="w-8 h-8 text-ios-light-secondary dark:text-ios-dark-secondary" />
          </div>
          <p className="text-ios-light-secondary dark:text-ios-dark-secondary">
            Select a file to preview
          </p>
        </CardContent>
      </Card>
    );
  }

  const getTypeIcon = () => {
    switch (selectedFile.type) {
      case 'video':
        return Video;
      case 'audio':
        return Music;
      default:
        return Image;
    }
  };

  const TypeIcon = getTypeIcon();

  const getStatusColor = () => {
    switch (selectedFile.status) {
      case 'completed':
        return 'green';
      case 'processing':
        return 'blue';
      case 'error':
        return 'red';
      default:
        return 'default';
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="space-y-4">
        {/* Preview area */}
        <div className="relative aspect-video rounded-ios overflow-hidden bg-ios-light-separator/30 dark:bg-ios-dark-separator/30">
          {selectedFile.preview && selectedFile.type !== 'audio' ? (
            <>
              {selectedFile.type === 'video' ? (
                <video
                  src={selectedFile.outputUrl || selectedFile.preview}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={selectedFile.outputUrl || selectedFile.preview}
                  alt={selectedFile.name}
                  className="w-full h-full object-contain"
                />
              )}

              {/* Comparison toggle for completed files */}
              {selectedFile.status === 'completed' && selectedFile.outputUrl && (
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    className="px-3 py-1.5 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm hover:bg-black/70 transition-colors"
                  >
                    Result
                  </button>
                </div>
              )}
            </>
          ) : selectedFile.type === 'audio' ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ios-light-purple to-ios-light-blue dark:from-ios-dark-purple dark:to-ios-dark-blue flex items-center justify-center">
                <Music className="w-10 h-10 text-white" />
              </div>
              <audio
                src={selectedFile.outputUrl || selectedFile.preview}
                controls
                className="w-full max-w-md"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <TypeIcon className="w-16 h-16 text-ios-light-secondary dark:text-ios-dark-secondary" />
            </div>
          )}

          {/* Processing overlay */}
          {selectedFile.status === 'processing' && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin" />
              <p className="text-white font-medium">Converting...</p>
              <div className="w-48">
                <ProgressBar progress={selectedFile.progress} color="blue" />
              </div>
            </div>
          )}
        </div>

        {/* File info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{selectedFile.name}</h3>
              <p className="text-sm text-ios-light-secondary dark:text-ios-dark-secondary">
                {selectedFile.mimeType}
              </p>
            </div>
            <Badge variant={getStatusColor() as any}>
              {selectedFile.status.charAt(0).toUpperCase() + selectedFile.status.slice(1)}
            </Badge>
          </div>

          {/* Size comparison */}
          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-ios-light-secondary dark:text-ios-dark-secondary">Original: </span>
              <span className="font-medium">{formatBytes(selectedFile.size)}</span>
            </div>
            {selectedFile.outputSize && (
              <>
                <span className="text-ios-light-secondary dark:text-ios-dark-secondary">→</span>
                <div>
                  <span className="text-ios-light-secondary dark:text-ios-dark-secondary">Output: </span>
                  <span
                    className={`font-medium ${
                      selectedFile.outputSize < selectedFile.size
                        ? 'text-ios-light-green dark:text-ios-dark-green'
                        : ''
                    }`}
                  >
                    {formatBytes(selectedFile.outputSize)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Error message */}
          {selectedFile.error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 rounded-ios bg-ios-light-red/10 dark:bg-ios-dark-red/10"
            >
              <p className="text-sm text-ios-light-red dark:text-ios-dark-red">
                {selectedFile.error}
              </p>
            </motion.div>
          )}

          {/* Download button */}
          {selectedFile.status === 'completed' && selectedFile.outputUrl && selectedFile.outputName && (
            <Button
              fullWidth
              onClick={() => downloadFile(selectedFile.outputUrl!, selectedFile.outputName!)}
              leftIcon={<Download className="w-5 h-5" />}
            >
              Download Converted File
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
