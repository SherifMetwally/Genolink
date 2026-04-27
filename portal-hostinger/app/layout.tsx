import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Genolink Physician Portal',
  description: 'Secure portal for physician test management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
