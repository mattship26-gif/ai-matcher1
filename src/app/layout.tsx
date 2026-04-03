import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Solution Matcher | Find Your Perfect AI Tool',
  description: 'Discover the right AI solutions for your business in minutes. Match with tools based on your industry, needs, and budget.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
