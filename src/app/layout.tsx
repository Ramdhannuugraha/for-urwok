import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'FK Work Assistant',
  description: 'Asisten Digital Pribadi untuk Manajemen Pekerjaan Tenaga Kependidikan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
