import { MediaType, IMAGE_FORMATS, VIDEO_FORMATS, AUDIO_FORMATS } from '@/types';

/**
 * Detect media type from MIME type
 */
export function detectMediaType(mimeType: string): MediaType {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  return 'image';
}

/**
 * Get supported formats for media type
 */
export function getFormatsForType(mediaType: MediaType) {
  switch (mediaType) {
    case 'image':
      return IMAGE_FORMATS;
    case 'video':
      return VIDEO_FORMATS;
    case 'audio':
      return AUDIO_FORMATS;
    default:
      return IMAGE_FORMATS;
  }
}

/**
 * Get default format for media type
 */
export function getDefaultFormat(mediaType: MediaType): string {
  switch (mediaType) {
    case 'image':
      return 'jpeg';
    case 'video':
      return 'mp4';
    case 'audio':
      return 'mp3';
    default:
      return 'jpeg';
  }
}

/**
 * Validate file type is supported
 */
export function isFileTypeSupported(mimeType: string): boolean {
  const supportedTypes = [
    // Images
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/tiff',
    'image/avif',
    // Videos
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'video/mpeg',
    'video/3gpp',
    // Audio
    'audio/mpeg',
    'audio/wav',
    'audio/aac',
    'audio/ogg',
    'audio/flac',
    'audio/mp4',
  ];
  return supportedTypes.includes(mimeType);
}

/**
 * Get media icon name
 */
export function getMediaIcon(mediaType: MediaType): string {
  switch (mediaType) {
    case 'image':
      return 'Image';
    case 'video':
      return 'Video';
    case 'audio':
      return 'Music';
    default:
      return 'File';
  }
}

/**
 * Get accept string for file input
 */
export function getAcceptString(): string {
  return [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/tiff',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/x-msvideo',
    'audio/mpeg',
    'audio/wav',
    'audio/aac',
    'audio/ogg',
  ].join(',');
}

/**
 * Check if conversion supports the format pair
 */
export function isConversionSupported(
  inputMime: string,
  outputFormat: string
): boolean {
  const inputType = detectMediaType(inputMime);
  
  // Images can convert to other images
  if (inputType === 'image') {
    return IMAGE_FORMATS.some((f) => f.value === outputFormat);
  }
  
  // Videos can convert to videos or GIF
  if (inputType === 'video') {
    return VIDEO_FORMATS.some((f) => f.value === outputFormat);
  }
  
  // Audio can convert to audio
  if (inputType === 'audio') {
    return AUDIO_FORMATS.some((f) => f.value === outputFormat);
  }
  
  return false;
}
