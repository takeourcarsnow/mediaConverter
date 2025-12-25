'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useConversionStore } from '@/store/conversionStore';
import { Select, SegmentedControl } from '@/components/ui/Select';
import { Slider, Toggle } from '@/components/ui/Slider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import {
  IMAGE_FORMATS,
  VIDEO_FORMATS,
  AUDIO_FORMATS,
  IMAGE_QUALITY_PRESETS,
  VIDEO_QUALITY_PRESETS,
  VIDEO_RESOLUTIONS,
  GIF_PRESETS,
} from '@/types/formats';

export function ConversionSettings() {
  const { files, selectedFileId, globalOptions, setGlobalOptions } = useConversionStore();

  const selectedFile = useMemo(
    () => files.find((f) => f.id === selectedFileId),
    [files, selectedFileId]
  );

  const mediaType = selectedFile?.type || 'image';

  const formatOptions = useMemo(() => {
    switch (mediaType) {
      case 'image':
        return IMAGE_FORMATS.map((f) => ({
          value: f.value,
          label: f.label,
          description: f.description,
        }));
      case 'video':
        return VIDEO_FORMATS.map((f) => ({
          value: f.value,
          label: f.label,
          description: f.description,
        }));
      case 'audio':
        return AUDIO_FORMATS.map((f) => ({
          value: f.value,
          label: f.label,
          description: f.description,
        }));
      default:
        return IMAGE_FORMATS.map((f) => ({
          value: f.value,
          label: f.label,
        }));
    }
  }, [mediaType]);

  const qualityPresets = useMemo(() => {
    return mediaType === 'image' ? IMAGE_QUALITY_PRESETS : VIDEO_QUALITY_PRESETS;
  }, [mediaType]);

  const isGifConversion = globalOptions.format === 'gif' && mediaType === 'video';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Output Format */}
        <Select
          label="Output Format"
          options={formatOptions}
          value={globalOptions.format}
          onChange={(value) => setGlobalOptions({ format: value })}
        />

        {/* Quality Preset */}
        <div>
          <label className="block text-sm font-medium text-ios-light-secondary dark:text-ios-dark-secondary mb-3">
            Quality
          </label>
          <SegmentedControl
            options={qualityPresets.map((p) => ({
              value: p.value,
              label: p.label,
            }))}
            value={globalOptions.quality}
            onChange={(value) => setGlobalOptions({ quality: value })}
          />
        </div>

        {/* Video/GIF specific options */}
        {mediaType === 'video' && (
          <>
            {isGifConversion ? (
              /* GIF Settings */
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 pt-4 border-t border-ios-light-separator dark:border-ios-dark-separator"
              >
                <h4 className="text-sm font-semibold text-ios-light-secondary dark:text-ios-dark-secondary">
                  GIF Settings
                </h4>
                
                <Slider
                  label="Frame Rate (FPS)"
                  value={globalOptions.gifFps || 10}
                  onChange={(value) => setGlobalOptions({ gifFps: value })}
                  min={5}
                  max={30}
                  step={1}
                  valueFormatter={(v) => `${v} fps`}
                />

                <Slider
                  label="Width"
                  value={globalOptions.gifWidth || 480}
                  onChange={(value) => setGlobalOptions({ gifWidth: value })}
                  min={120}
                  max={800}
                  step={20}
                  valueFormatter={(v) => `${v}px`}
                />

                <Toggle
                  label="Loop Animation"
                  checked={globalOptions.loop !== false}
                  onChange={(checked) => setGlobalOptions({ loop: checked })}
                />
              </motion.div>
            ) : (
              /* Video Settings */
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 pt-4 border-t border-ios-light-separator dark:border-ios-dark-separator"
              >
                <h4 className="text-sm font-semibold text-ios-light-secondary dark:text-ios-dark-secondary">
                  Video Settings
                </h4>

                <Select
                  label="Resolution"
                  options={VIDEO_RESOLUTIONS.map((r) => ({
                    value: r.value,
                    label: r.label,
                  }))}
                  value={globalOptions.resolution || 'original'}
                  onChange={(value) => setGlobalOptions({ resolution: value })}
                />

                <Toggle
                  label="Remove Audio"
                  checked={globalOptions.removeAudio || false}
                  onChange={(checked) => setGlobalOptions({ removeAudio: checked })}
                />
              </motion.div>
            )}
          </>
        )}

        {/* Image specific options */}
        {mediaType === 'image' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 pt-4 border-t border-ios-light-separator dark:border-ios-dark-separator"
          >
            <h4 className="text-sm font-semibold text-ios-light-secondary dark:text-ios-dark-secondary">
              Resize (Optional)
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-ios-light-secondary dark:text-ios-dark-secondary mb-1">
                  Width
                </label>
                <input
                  type="number"
                  placeholder="Auto"
                  value={globalOptions.width || ''}
                  onChange={(e) =>
                    setGlobalOptions({ width: e.target.value ? Number(e.target.value) : undefined })
                  }
                  className="w-full px-3 py-2 rounded-ios bg-ios-light-separator/30 dark:bg-ios-dark-separator/30 border border-ios-light-separator dark:border-ios-dark-separator focus:outline-none focus:ring-2 focus:ring-ios-light-blue dark:focus:ring-ios-dark-blue"
                />
              </div>
              <div>
                <label className="block text-xs text-ios-light-secondary dark:text-ios-dark-secondary mb-1">
                  Height
                </label>
                <input
                  type="number"
                  placeholder="Auto"
                  value={globalOptions.height || ''}
                  onChange={(e) =>
                    setGlobalOptions({ height: e.target.value ? Number(e.target.value) : undefined })
                  }
                  className="w-full px-3 py-2 rounded-ios bg-ios-light-separator/30 dark:bg-ios-dark-separator/30 border border-ios-light-separator dark:border-ios-dark-separator focus:outline-none focus:ring-2 focus:ring-ios-light-blue dark:focus:ring-ios-dark-blue"
                />
              </div>
            </div>

            <Toggle
              label="Maintain Aspect Ratio"
              checked={globalOptions.maintainAspectRatio !== false}
              onChange={(checked) => setGlobalOptions({ maintainAspectRatio: checked })}
            />
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
