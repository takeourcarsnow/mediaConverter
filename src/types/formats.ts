// Media file types
export type MediaType = 'image' | 'video' | 'audio';

// Supported formats
export interface FormatOption {
  value: string;
  label: string;
  extension: string;
  type: MediaType;
  description?: string;
}

// Image formats
export const IMAGE_FORMATS: FormatOption[] = [
  { value: 'jpeg', label: 'JPEG', extension: 'jpg', type: 'image', description: 'Best for photos' },
  { value: 'png', label: 'PNG', extension: 'png', type: 'image', description: 'Lossless, supports transparency' },
  { value: 'webp', label: 'WebP', extension: 'webp', type: 'image', description: 'Modern format, smaller size' },
  { value: 'gif', label: 'GIF', extension: 'gif', type: 'image', description: 'Animated images' },
  { value: 'bmp', label: 'BMP', extension: 'bmp', type: 'image', description: 'Uncompressed bitmap' },
  { value: 'tiff', label: 'TIFF', extension: 'tiff', type: 'image', description: 'High quality, large files' },
  { value: 'avif', label: 'AVIF', extension: 'avif', type: 'image', description: 'Next-gen compression' },
];

// Video formats
export const VIDEO_FORMATS: FormatOption[] = [
  { value: 'mp4', label: 'MP4', extension: 'mp4', type: 'video', description: 'Universal compatibility' },
  { value: 'webm', label: 'WebM', extension: 'webm', type: 'video', description: 'Web optimized' },
  { value: 'avi', label: 'AVI', extension: 'avi', type: 'video', description: 'Windows standard' },
  { value: 'mov', label: 'MOV', extension: 'mov', type: 'video', description: 'Apple QuickTime' },
  { value: 'mkv', label: 'MKV', extension: 'mkv', type: 'video', description: 'Matroska container' },
  { value: 'gif', label: 'GIF', extension: 'gif', type: 'video', description: 'Animated GIF' },
];

// Audio formats
export const AUDIO_FORMATS: FormatOption[] = [
  { value: 'mp3', label: 'MP3', extension: 'mp3', type: 'audio', description: 'Universal audio' },
  { value: 'wav', label: 'WAV', extension: 'wav', type: 'audio', description: 'Uncompressed audio' },
  { value: 'aac', label: 'AAC', extension: 'aac', type: 'audio', description: 'High quality compressed' },
  { value: 'ogg', label: 'OGG', extension: 'ogg', type: 'audio', description: 'Open source format' },
  { value: 'flac', label: 'FLAC', extension: 'flac', type: 'audio', description: 'Lossless compression' },
];

// Quality presets
export interface QualityPreset {
  value: string;
  label: string;
  description: string;
  crf?: number;
  quality?: number;
}

export const VIDEO_QUALITY_PRESETS: QualityPreset[] = [
  { value: 'highest', label: 'Highest', description: 'Best quality, larger file', crf: 18 },
  { value: 'high', label: 'High', description: 'Great quality', crf: 23 },
  { value: 'medium', label: 'Medium', description: 'Balanced', crf: 28 },
  { value: 'low', label: 'Low', description: 'Smaller file', crf: 33 },
  { value: 'lowest', label: 'Lowest', description: 'Smallest file', crf: 38 },
];

export const IMAGE_QUALITY_PRESETS: QualityPreset[] = [
  { value: 'highest', label: 'Highest', description: '100% quality', quality: 100 },
  { value: 'high', label: 'High', description: '85% quality', quality: 85 },
  { value: 'medium', label: 'Medium', description: '70% quality', quality: 70 },
  { value: 'low', label: 'Low', description: '50% quality', quality: 50 },
  { value: 'lowest', label: 'Lowest', description: '30% quality', quality: 30 },
];

// Resolution presets
export interface ResolutionPreset {
  value: string;
  label: string;
  width: number;
  height: number;
}

export const VIDEO_RESOLUTIONS: ResolutionPreset[] = [
  { value: '4k', label: '4K UHD', width: 3840, height: 2160 },
  { value: '1080p', label: '1080p Full HD', width: 1920, height: 1080 },
  { value: '720p', label: '720p HD', width: 1280, height: 720 },
  { value: '480p', label: '480p SD', width: 854, height: 480 },
  { value: '360p', label: '360p', width: 640, height: 360 },
  { value: 'original', label: 'Original', width: 0, height: 0 },
];

// GIF presets
export interface GifPreset {
  value: string;
  label: string;
  fps: number;
  width: number;
  description: string;
}

export const GIF_PRESETS: GifPreset[] = [
  { value: 'high', label: 'High Quality', fps: 15, width: 640, description: 'Smooth, larger file' },
  { value: 'medium', label: 'Balanced', fps: 10, width: 480, description: 'Good quality & size' },
  { value: 'low', label: 'Compact', fps: 8, width: 320, description: 'Small file size' },
  { value: 'social', label: 'Social Media', fps: 12, width: 500, description: 'Optimized for sharing' },
];
