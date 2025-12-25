'use client';

import { useCallback } from 'react';
import { useFFmpeg } from '@/providers/FFmpegProvider';
import { useConversionStore } from '@/store/conversionStore';
import { MediaConverter } from '@/lib/converter';

export function useMediaConversion() {
  const { ffmpeg, isLoaded, isLoading, loadError, loadFFmpeg } = useFFmpeg();
  const {
    files,
    globalOptions,
    updateFileStatus,
    updateFileProgress,
    updateFileResult,
    updateFileError,
    setIsConverting,
  } = useConversionStore();

  const convertFile = useCallback(
    async (fileId: string) => {
      if (!ffmpeg || !isLoaded) {
        updateFileError(fileId, 'FFmpeg not loaded');
        return;
      }

      const file = files.find((f) => f.id === fileId);
      if (!file) {
        console.error('File not found:', fileId);
        return;
      }

      updateFileStatus(fileId, 'processing');
      updateFileProgress(fileId, 0);

      const converter = new MediaConverter(ffmpeg, (progress) => {
        updateFileProgress(fileId, progress);
      });

      try {
        const result = await converter.convert(file.file, file.type, globalOptions);

        if (result.success && result.outputUrl) {
          updateFileResult(fileId, result.outputUrl, result.outputName!, result.outputSize!);
        } else {
          updateFileError(fileId, result.error || 'Conversion failed');
        }
      } catch (error) {
        console.error('Conversion error:', error);
        updateFileError(fileId, error instanceof Error ? error.message : 'Conversion failed');
      }
    },
    [ffmpeg, isLoaded, files, globalOptions, updateFileStatus, updateFileProgress, updateFileResult, updateFileError]
  );

  const convertAllFiles = useCallback(async () => {
    if (!ffmpeg || !isLoaded) {
      console.error('FFmpeg not loaded');
      return;
    }

    setIsConverting(true);

    const pendingFiles = files.filter((f) => f.status === 'pending' || f.status === 'error');

    for (const file of pendingFiles) {
      await convertFile(file.id);
    }

    setIsConverting(false);
  }, [ffmpeg, isLoaded, files, convertFile, setIsConverting]);

  const downloadFile = useCallback((outputUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = outputUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const downloadAllFiles = useCallback(() => {
    const completedFiles = files.filter((f) => f.status === 'completed' && f.outputUrl);
    completedFiles.forEach((file) => {
      if (file.outputUrl && file.outputName) {
        downloadFile(file.outputUrl, file.outputName);
      }
    });
  }, [files, downloadFile]);

  return {
    isLoaded,
    isLoading,
    loadError,
    loadFFmpeg,
    convertFile,
    convertAllFiles,
    downloadFile,
    downloadAllFiles,
  };
}
