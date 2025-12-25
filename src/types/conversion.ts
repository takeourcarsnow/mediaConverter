import { MediaType } from './formats';

export type ConversionStatus = 'pending' | 'processing' | 'completed' | 'error';

export interface ConversionFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: MediaType;
  mimeType: string;
  preview?: string;
  status: ConversionStatus;
  progress: number;
  error?: string;
  outputUrl?: string;
  outputName?: string;
  outputSize?: number;
}

export interface ConversionOptions {
  // Common options
  format: string;
  quality: string;
  
  // Image specific
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
  
  // Video specific
  resolution?: string;
  fps?: number;
  startTime?: number;
  endTime?: number;
  removeAudio?: boolean;
  
  // GIF specific
  gifFps?: number;
  gifWidth?: number;
  loop?: boolean;
}

export interface ConversionResult {
  success: boolean;
  outputUrl?: string;
  outputName?: string;
  outputSize?: number;
  error?: string;
}

export interface ConversionTask {
  fileId: string;
  options: ConversionOptions;
}
