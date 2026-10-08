import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Saveur — Recipe Browser',
  description:
    'Discover delicious recipes from around the world. Search, browse, and cook with confidence.',
  openGraph: {
    title: 'Saveur — Recipe Browser',
    description:
      'Discover delicious recipes from around the world. Search, browse, and cook with confidence.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
