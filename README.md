# MediaFlow - Media Converter App

A beautiful, iOS-like media converter application built with Next.js, TypeScript, and FFmpeg.wasm. Convert images, videos, and create GIFs right in your browser with complete privacy.

## Features

- 🖼️ **Image Conversion** - Convert between JPEG, PNG, WebP, GIF, AVIF, TIFF, BMP
- 🎬 **Video Conversion** - Transform videos to MP4, WebM, MOV, AVI, MKV
- 🎞️ **GIF Creator** - Turn any video into animated GIFs with custom settings
- 🎵 **Audio Extraction** - Extract and convert audio to MP3, WAV, AAC, OGG, FLAC
- 🔒 **100% Private** - All processing happens locally in your browser
- 🌙 **Dark/Light Theme** - Beautiful iOS-inspired UI with theme support
- 📱 **Mobile Friendly** - Responsive design that works on all devices
- ⚡ **No Upload Limits** - Process files of any size

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Media Processing**: FFmpeg.wasm
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd ffd
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Important Notes

- The app requires **SharedArrayBuffer** support, which requires specific security headers
- These headers are configured in `next.config.js`
- For local development, use Chrome or another modern browser

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── converter/         # Conversion components
│   │   ├── ConversionActions.tsx
│   │   ├── ConversionSettings.tsx
│   │   ├── ConversionWorkspace.tsx
│   │   ├── FileDropzone.tsx
│   │   ├── FileItem.tsx
│   │   ├── FileList.tsx
│   │   └── FilePreview.tsx
│   ├── home/              # Home page components
│   │   ├── FeatureCards.tsx
│   │   └── HeroSection.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── Navigation.tsx
│   └── ui/                # Reusable UI components
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── FFmpegStatus.tsx
│       ├── Modal.tsx
│       ├── ProgressBar.tsx
│       ├── Select.tsx
│       ├── Slider.tsx
│       ├── ThemeSwitcher.tsx
│       └── Toast.tsx
├── hooks/                 # Custom React hooks
│   ├── useMediaConversion.ts
│   └── useWindowSize.ts
├── lib/                   # Utility libraries
│   ├── converter/        # FFmpeg conversion logic
│   │   └── mediaConverter.ts
│   └── utils/            # Helper functions
│       ├── format.ts
│       └── mediaUtils.ts
├── providers/            # React context providers
│   ├── FFmpegProvider.tsx
│   └── ThemeProvider.tsx
├── store/                # Zustand stores
│   ├── conversionStore.ts
│   └── themeStore.ts
└── types/                # TypeScript types
    ├── conversion.ts
    └── formats.ts
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy!

Note: The required security headers are already configured in `next.config.js`

### Supabase (Optional)

If you want to add user authentication or store conversion history:

1. Create a Supabase project
2. Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Browser Support

- Chrome 89+
- Firefox 89+
- Safari 16.4+
- Edge 89+

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
