'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useConversionStore } from '@/store/conversionStore';
import { FileItem } from './FileItem';
import { FileDropzone } from './FileDropzone';
import { useMediaConversion } from '@/hooks/useMediaConversion';

export function FileList() {
  const { files, selectedFileId, selectFile, removeFile } = useConversionStore();
  const { downloadFile } = useMediaConversion();

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Files ({files.length})
        </h3>
      </div>

      <motion.div layout className="space-y-2">
        <AnimatePresence mode="popLayout">
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              isSelected={file.id === selectedFileId}
              onSelect={() => selectFile(file.id)}
              onRemove={() => removeFile(file.id)}
              onDownload={
                file.outputUrl && file.outputName
                  ? () => downloadFile(file.outputUrl!, file.outputName!)
                  : undefined
              }
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Add more files */}
      <FileDropzone compact />
    </div>
  );
}
