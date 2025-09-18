import type { Metadata } from 'next';

import './globals.css';
import BackLink from './back-link';

export const metadata: Metadata = {
  title: 'WhyWire Authentication',
  description: 'Authentication system for WhyWire using Appwrite',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <BackLink />
        {children}
      </body>
    </html>
  );
}
