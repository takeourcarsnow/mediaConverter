'use client';

import { create } from 'zustand';
import { ConversionFile, ConversionOptions, ConversionStatus } from '@/types';

interface ConversionState {
  files: ConversionFile[];
  selectedFileId: string | null;
  globalOptions: ConversionOptions;
  isConverting: boolean;
  
  // Actions
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  selectFile: (id: string | null) => void;
  updateFileStatus: (id: string, status: ConversionStatus) => void;
  updateFileProgress: (id: string, progress: number) => void;
  updateFileResult: (id: string, outputUrl: string, outputName: string, outputSize: number) => void;
  updateFileError: (id: string, error: string) => void;
  setGlobalOptions: (options: Partial<ConversionOptions>) => void;
  setIsConverting: (converting: boolean) => void;
}

const getMediaType = (mimeType: string): 'image' | 'video' | 'audio' => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  return 'image';
};

const generateId = () => Math.random().toString(36).substring(2, 15);

const createPreview = (file: File): Promise<string | undefined> => {
  return new Promise((resolve) => {
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      resolve(url);
    } else {
      resolve(undefined);
    }
  });
};

export const useConversionStore = create<ConversionState>((set, get) => ({
  files: [],
  selectedFileId: null,
  globalOptions: {
    format: 'jpeg',
    quality: 'high',
    maintainAspectRatio: true,
    resolution: 'original',
    removeAudio: false,
    gifFps: 10,
    gifWidth: 480,
    loop: true,
  },
  isConverting: false,

  addFiles: async (newFiles: File[]) => {
    const processedFiles: ConversionFile[] = await Promise.all(
      newFiles.map(async (file) => {
        const preview = await createPreview(file);
        return {
          id: generateId(),
          file,
          name: file.name,
          size: file.size,
          type: getMediaType(file.type),
          mimeType: file.type,
          preview,
          status: 'pending' as ConversionStatus,
          progress: 0,
        };
      })
    );

    set((state) => ({
      files: [...state.files, ...processedFiles],
      selectedFileId: state.selectedFileId || processedFiles[0]?.id || null,
    }));
  },

  removeFile: (id: string) => {
    set((state) => {
      const file = state.files.find((f) => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      if (file?.outputUrl) {
        URL.revokeObjectURL(file.outputUrl);
      }
      
      const newFiles = state.files.filter((f) => f.id !== id);
      return {
        files: newFiles,
        selectedFileId: state.selectedFileId === id 
          ? newFiles[0]?.id || null 
          : state.selectedFileId,
      };
    });
  },

  clearFiles: () => {
    const { files } = get();
    files.forEach((file) => {
      if (file.preview) URL.revokeObjectURL(file.preview);
      if (file.outputUrl) URL.revokeObjectURL(file.outputUrl);
    });
    set({ files: [], selectedFileId: null });
  },

  selectFile: (id: string | null) => {
    set({ selectedFileId: id });
  },

  updateFileStatus: (id: string, status: ConversionStatus) => {
    set((state) => ({
      files: state.files.map((f) =>
        f.id === id ? { ...f, status } : f
      ),
    }));
  },

  updateFileProgress: (id: string, progress: number) => {
    set((state) => ({
      files: state.files.map((f) =>
        f.id === id ? { ...f, progress } : f
      ),
    }));
  },

  updateFileResult: (id: string, outputUrl: string, outputName: string, outputSize: number) => {
    set((state) => ({
      files: state.files.map((f) =>
        f.id === id
          ? { ...f, status: 'completed' as ConversionStatus, progress: 100, outputUrl, outputName, outputSize }
          : f
      ),
    }));
  },

  updateFileError: (id: string, error: string) => {
    set((state) => ({
      files: state.files.map((f) =>
        f.id === id ? { ...f, status: 'error' as ConversionStatus, error } : f
      ),
    }));
  },

  setGlobalOptions: (options: Partial<ConversionOptions>) => {
    set((state) => ({
      globalOptions: { ...state.globalOptions, ...options },
    }));
  },

  setIsConverting: (converting: boolean) => {
    set({ isConverting: converting });
  },
}));
