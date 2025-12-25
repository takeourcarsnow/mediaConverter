import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { FFmpegProvider } from '@/providers/FFmpegProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'MediaFlow - Convert Photos & Videos',
  description: 'A beautiful media converter for photos, videos, and GIFs. Convert, compress, and transform your media files instantly.',
  keywords: ['media converter', 'video converter', 'image converter', 'gif maker', 'compress video'],
  authors: [{ name: 'MediaFlow' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MediaFlow',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f2f7' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <FFmpegProvider>
            {children}
          </FFmpegProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
