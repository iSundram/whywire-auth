import type { Metadata } from 'next';
import './globals.css';
import BackLink from './back-link';

export const metadata: Metadata = {
  title: 'WhyWire Auth',
  description: 'Authentication system for WhyWire powered by Appwrite',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <BackLink />
        {children}
      </body>
    </html>
  );
}
