import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { ConversionOptions, ConversionResult, MediaType } from '@/types';
import { IMAGE_FORMATS, VIDEO_FORMATS, VIDEO_QUALITY_PRESETS, IMAGE_QUALITY_PRESETS } from '@/types/formats';

export class MediaConverter {
  private ffmpeg: FFmpeg;
  private onProgress: (progress: number) => void;

  constructor(ffmpeg: FFmpeg, onProgress: (progress: number) => void) {
    this.ffmpeg = ffmpeg;
    this.onProgress = onProgress;
  }

  async convert(
    file: File,
    mediaType: MediaType,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    try {
      const inputName = `input_${Date.now()}.${file.name.split('.').pop()}`;
      const outputExt = this.getOutputExtension(options.format, mediaType);
      const outputName = `output_${Date.now()}.${outputExt}`;

      // Write input file
      await this.ffmpeg.writeFile(inputName, await fetchFile(file));

      // Build FFmpeg command
      const args = this.buildCommand(inputName, outputName, mediaType, options);

      // Execute conversion
      await this.ffmpeg.exec(args);

      // Read output file
      const data = await this.ffmpeg.readFile(outputName);
      const blob = new Blob([data as any], { type: this.getMimeType(options.format, mediaType) });
      const outputUrl = URL.createObjectURL(blob);

      // Clean up
      await this.ffmpeg.deleteFile(inputName);
      await this.ffmpeg.deleteFile(outputName);

      const baseName = file.name.split('.').slice(0, -1).join('.');
      const finalOutputName = `${baseName}_converted.${outputExt}`;

      return {
        success: true,
        outputUrl,
        outputName: finalOutputName,
        outputSize: blob.size,
      };
    } catch (error) {
      console.error('Conversion error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Conversion failed',
      };
    }
  }

  private buildCommand(
    inputName: string,
    outputName: string,
    mediaType: MediaType,
    options: ConversionOptions
  ): string[] {
    const args: string[] = ['-i', inputName];

    if (mediaType === 'image') {
      return this.buildImageCommand(args, outputName, options);
    } else if (mediaType === 'video') {
      if (options.format === 'gif') {
        return this.buildVideoToGifCommand(args, outputName, options);
      }
      return this.buildVideoCommand(args, outputName, options);
    } else if (mediaType === 'audio') {
      return this.buildAudioCommand(args, outputName, options);
    }

    args.push(outputName);
    return args;
  }

  private buildImageCommand(
    args: string[],
    outputName: string,
    options: ConversionOptions
  ): string[] {
    // Quality
    const qualityPreset = IMAGE_QUALITY_PRESETS.find((p) => p.value === options.quality);
    const quality = qualityPreset?.quality || 85;

    // Resize
    if (options.width && options.height && !options.maintainAspectRatio) {
      args.push('-vf', `scale=${options.width}:${options.height}`);
    } else if (options.width || options.height) {
      const w = options.width || -1;
      const h = options.height || -1;
      args.push('-vf', `scale=${w}:${h}`);
    }

    // Format specific options
    if (options.format === 'jpeg' || options.format === 'jpg') {
      args.push('-q:v', String(Math.round((100 - quality) / 3.3)));
    } else if (options.format === 'webp') {
      args.push('-quality', String(quality));
    } else if (options.format === 'png') {
      args.push('-compression_level', String(Math.round((100 - quality) / 10)));
    }

    args.push('-y', outputName);
    return args;
  }

  private buildVideoCommand(
    args: string[],
    outputName: string,
    options: ConversionOptions
  ): string[] {
    const filters: string[] = [];

    // Time range
    if (options.startTime !== undefined && options.startTime > 0) {
      args.push('-ss', String(options.startTime));
    }
    if (options.endTime !== undefined && options.endTime > 0) {
      args.push('-to', String(options.endTime));
    }

    // Resolution
    if (options.resolution && options.resolution !== 'original') {
      const resolutionMap: Record<string, string> = {
        '4k': '3840:2160',
        '1080p': '1920:1080',
        '720p': '1280:720',
        '480p': '854:480',
        '360p': '640:360',
      };
      const scale = resolutionMap[options.resolution];
      if (scale) {
        filters.push(`scale=${scale}:force_original_aspect_ratio=decrease`);
      }
    }

    // FPS
    if (options.fps) {
      filters.push(`fps=${options.fps}`);
    }

    // Apply filters
    if (filters.length > 0) {
      args.push('-vf', filters.join(','));
    }

    // Quality
    const qualityPreset = VIDEO_QUALITY_PRESETS.find((p) => p.value === options.quality);
    const crf = qualityPreset?.crf || 23;
    args.push('-crf', String(crf));

    // Remove audio
    if (options.removeAudio) {
      args.push('-an');
    } else {
      args.push('-c:a', 'aac', '-b:a', '128k');
    }

    // Video codec
    if (options.format === 'webm') {
      args.push('-c:v', 'libvpx-vp9');
    } else if (options.format === 'mp4') {
      args.push('-c:v', 'libx264', '-preset', 'medium');
    }

    args.push('-y', outputName);
    return args;
  }

  private buildVideoToGifCommand(
    args: string[],
    outputName: string,
    options: ConversionOptions
  ): string[] {
    const fps = options.gifFps || 10;
    const width = options.gifWidth || 480;

    // Time range
    if (options.startTime !== undefined && options.startTime > 0) {
      args.push('-ss', String(options.startTime));
    }
    if (options.endTime !== undefined && options.endTime > 0) {
      args.push('-t', String((options.endTime || 10) - (options.startTime || 0)));
    }

    // GIF specific filter
    const filters = [
      `fps=${fps}`,
      `scale=${width}:-1:flags=lanczos`,
      'split[s0][s1]',
      '[s0]palettegen=max_colors=256:stats_mode=diff[p]',
      '[s1][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle',
    ];

    args.push('-filter_complex', filters.join(';'));

    // Loop
    if (options.loop !== false) {
      args.push('-loop', '0');
    }

    args.push('-y', outputName);
    return args;
  }

  private buildAudioCommand(
    args: string[],
    outputName: string,
    options: ConversionOptions
  ): string[] {
    // Time range
    if (options.startTime !== undefined && options.startTime > 0) {
      args.push('-ss', String(options.startTime));
    }
    if (options.endTime !== undefined && options.endTime > 0) {
      args.push('-to', String(options.endTime));
    }

    // Quality/bitrate
    const bitrateMap: Record<string, string> = {
      highest: '320k',
      high: '256k',
      medium: '192k',
      low: '128k',
      lowest: '96k',
    };
    const bitrate = bitrateMap[options.quality] || '192k';
    args.push('-b:a', bitrate);

    args.push('-y', outputName);
    return args;
  }

  private getOutputExtension(format: string, mediaType: MediaType): string {
    const allFormats = [...IMAGE_FORMATS, ...VIDEO_FORMATS];
    const formatInfo = allFormats.find((f) => f.value === format);
    return formatInfo?.extension || format;
  }

  private getMimeType(format: string, mediaType: MediaType): string {
    const mimeTypes: Record<string, string> = {
      // Images
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      bmp: 'image/bmp',
      tiff: 'image/tiff',
      avif: 'image/avif',
      // Videos
      mp4: 'video/mp4',
      webm: 'video/webm',
      avi: 'video/x-msvideo',
      mov: 'video/quicktime',
      mkv: 'video/x-matroska',
      // Audio
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      aac: 'audio/aac',
      ogg: 'audio/ogg',
      flac: 'audio/flac',
    };
    return mimeTypes[format] || 'application/octet-stream';
  }
}
