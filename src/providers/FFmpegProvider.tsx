'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

interface FFmpegContextType {
  ffmpeg: FFmpeg | null;
  isLoaded: boolean;
  isLoading: boolean;
  loadError: string | null;
  loadFFmpeg: () => Promise<void>;
  progress: number;
}

const FFmpegContext = createContext<FFmpegContextType | undefined>(undefined);

export function FFmpegProvider({ children }: { children: ReactNode }) {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const loadFFmpeg = useCallback(async () => {
    if (isLoaded || isLoading) return;

    setIsLoading(true);
    setLoadError(null);

    try {
      const ffmpeg = new FFmpeg();
      ffmpegRef.current = ffmpeg;

      ffmpeg.on('progress', ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });

      ffmpeg.on('log', ({ message }) => {
        console.log('[FFmpeg]', message);
      });

      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
      
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to load FFmpeg:', error);
      setLoadError(error instanceof Error ? error.message : 'Failed to load FFmpeg');
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isLoading]);

  // Auto-load FFmpeg on mount
  useEffect(() => {
    loadFFmpeg();
  }, [loadFFmpeg]);

  return (
    <FFmpegContext.Provider
      value={{
        ffmpeg: ffmpegRef.current,
        isLoaded,
        isLoading,
        loadError,
        loadFFmpeg,
        progress,
      }}
    >
      {children}
    </FFmpegContext.Provider>
  );
}

export function useFFmpeg() {
  const context = useContext(FFmpegContext);
  if (context === undefined) {
    throw new Error('useFFmpeg must be used within an FFmpegProvider');
  }
  return context;
}
